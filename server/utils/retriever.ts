import { PineconeEmbeddings, PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import type { Chunk } from "./chunk";

/** Pinecone-hosted embedding model; must match the one scripts/ingest.ts used. */
export const EMBEDDING_MODEL = "multilingual-e5-large";

let store: PineconeStore | undefined;

function getStore() {
  const config = useRuntimeConfig();
  if (!config.pineconeApiKey || !config.pineconeIndex) return undefined;
  if (!store) {
    const pinecone = new Pinecone({ apiKey: config.pineconeApiKey });
    store = new PineconeStore(
      // e5 models embed questions and passages differently.
      new PineconeEmbeddings({
        apiKey: config.pineconeApiKey,
        model: EMBEDDING_MODEL,
        params: { input_type: "query" },
      }),
      {
        pineconeIndex: pinecone.index(config.pineconeIndex),
        namespace: config.pineconeNamespace || undefined,
        textKey: "text",
      },
    );
  }
  return store;
}

export interface Retrieval {
  chunks: Chunk[];
  /** True when every chunk was sent rather than a vector search result. */
  fullCorpus: boolean;
}

/**
 * Top-k sections for a question from Pinecone. Falls back to the full corpus
 * when Pinecone isn't configured or the search fails, so the terminal keeps
 * working (the corpus is small enough to fit in one prompt).
 */
export async function retrieve(query: string): Promise<Retrieval> {
  const all = await loadChunks();
  const vectorStore = getStore();
  if (!vectorStore) return { chunks: all, fullCorpus: true };

  try {
    const k = Number(useRuntimeConfig().retrievalTopK) || 6;
    const docs = await vectorStore.similaritySearch(query, k);
    const byId = new Map(all.map((c) => [c.id, c]));
    // Serve the text from the deployed corpus so a stale index can't cite removed content.
    const chunks = docs
      .map((d) => byId.get(String(d.metadata.chunkId)))
      .filter((c): c is Chunk => !!c);
    if (chunks.length) return { chunks, fullCorpus: false };
    console.warn("[ask] Pinecone returned no known chunks; is the index ingested?");
  } catch (error) {
    console.error("[ask] Pinecone search failed, using full corpus", error);
  }
  return { chunks: all, fullCorpus: true };
}
