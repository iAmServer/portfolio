import { PineconeEmbeddings, PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

export const EMBEDDING_MODEL = "multilingual-e5-large";

let store: PineconeStore | undefined;

function getStore() {
  const config = useRuntimeConfig();
  if (!config.pineconeApiKey || !config.pineconeIndex) return undefined;
  if (!store) {
    const pinecone = new Pinecone({ apiKey: config.pineconeApiKey });
    store = new PineconeStore(
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

export async function retrieve(query: string): Promise<Retrieval> {
  const all = await loadChunks();
  const vectorStore = getStore();
  if (!vectorStore) return { chunks: all, fullCorpus: true };

  try {
    const k = Number(useRuntimeConfig().retrievalTopK) || 6;
    const docs = await vectorStore.similaritySearch(query, k);
    const byId = new Map(all.map((c) => [c.id, c]));
    const chunks = docs
      .map((d) => byId.get(String(d.metadata.chunkId)))
      .filter((c): c is Chunk => !!c);

    if (chunks.length) return { chunks, fullCorpus: false };

    console.warn(
      "[ask] Pinecone returned no known chunks; is the index ingested?",
    );
  } catch (error) {
    console.error("[ask] Pinecone search failed, using full corpus", error);
  }
  return { chunks: all, fullCorpus: true };
}
