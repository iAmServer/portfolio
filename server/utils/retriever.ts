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

const QUESTIONS_NAMESPACE = "questions";

// Stores each question as a record in Pinecone; the embedding exists only because
// Pinecone requires a vector, the useful part is the metadata.
export async function logQuestion(entry: {
  question: string;
  answer: string;
  answered: boolean;
}) {
  const config = useRuntimeConfig();
  if (!config.pineconeApiKey || !config.pineconeIndex) return;
  try {
    const embeddings = new PineconeEmbeddings({
      apiKey: config.pineconeApiKey,
      model: EMBEDDING_MODEL,
      params: { input_type: "passage" },
    });
    const [values] = await embeddings.embedDocuments([entry.question]);
    const askedAt = new Date().toISOString();
    await new Pinecone({ apiKey: config.pineconeApiKey })
      .index(config.pineconeIndex)
      .namespace(QUESTIONS_NAMESPACE)
      .upsert([
        {
          id: `q-${askedAt}-${Math.random().toString(36).slice(2, 8)}`,
          values,
          metadata: {
            question: entry.question,
            answer: entry.answer.slice(0, 1000),
            answered: entry.answered,
            askedAt,
          },
        },
      ]);
  } catch (error) {
    console.error("[ask] couldn't log question", error);
  }
}

export async function retrieve(query: string): Promise<Retrieval> {
  const all = await loadChunks();
  const vectorStore = getStore();
  if (!vectorStore) return { chunks: all, fullCorpus: true };

  try {
    const k = Number(useRuntimeConfig().retrievalTopK) || 6;
    const docs = await vectorStore.similaritySearch(query, k);
    const chunks: Chunk[] = docs.map((d) => ({
      id: String(d.metadata.chunkId),
      file: String(d.metadata.file),
      title: String(d.metadata.title),
      text: d.pageContent,
    }));

    if (chunks.length) return { chunks, fullCorpus: false };

    console.warn(
      "[ask] Pinecone returned no chunks; is the index ingested?",
    );
  } catch (error) {
    console.error("[ask] Pinecone search failed, using full corpus", error);
  }
  return { chunks: all, fullCorpus: true };
}
