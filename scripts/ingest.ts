import { readFile } from "node:fs/promises";
import { Document } from "@langchain/core/documents";
import { PineconeEmbeddings, PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { CORPUS_FILES, chunkFile } from "../server/utils/chunk.ts";

const EMBEDDING_MODEL = "multilingual-e5-large";
const EMBEDDING_DIMENSION = 1024;

const apiKey = process.env.NUXT_PINECONE_API_KEY;
const indexName = process.env.NUXT_PINECONE_INDEX || "portfolio";
const namespace = process.env.NUXT_PINECONE_NAMESPACE || "corpus";

if (!apiKey) {
  console.error(
    "Set NUXT_PINECONE_API_KEY (in the environment or .env) first.",
  );
  process.exit(1);
}

const chunks = (
  await Promise.all(
    CORPUS_FILES.map(async (file) =>
      chunkFile(
        file,
        await readFile(
          new URL(`../server/corpus/${file}`, import.meta.url),
          "utf8",
        ),
      ),
    ),
  )
).flat();

const pinecone = new Pinecone({ apiKey });

await pinecone.createIndex({
  name: indexName,
  dimension: EMBEDDING_DIMENSION,
  metric: "cosine",
  spec: { serverless: { cloud: "aws", region: "us-east-1" } },
  suppressConflicts: true,
  waitUntilReady: true,
});

const index = pinecone.index(indexName);

try {
  await index.namespace(namespace).deleteAll();
} catch {
  // Namespace doesn't exist yet on first run.
}

const store = new PineconeStore(
  new PineconeEmbeddings({
    apiKey,
    model: EMBEDDING_MODEL,
    params: { input_type: "passage" },
  }),
  { pineconeIndex: index, namespace, textKey: "text" },
);

await store.addDocuments(
  chunks.map(
    (c) =>
      new Document({
        pageContent: c.text,
        metadata: { chunkId: c.id, file: c.file, title: c.title },
      }),
  ),
  { ids: chunks.map((c) => c.id) },
);

console.log(`Ingested ${chunks.length} chunks into ${indexName}/${namespace}:`);
for (const c of chunks) console.log(`  ${c.id}`);
