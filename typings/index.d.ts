interface Entry {
  q: string;
  a?: string;
  pending?: boolean;
  error?: string;
  example?: boolean;
}

interface Block {
  kind: "h1" | "h2" | "h3" | "p" | "li" | "code";
  text: string;
  slug?: string;
}

interface OpenDoc {
  file: string;
  anchor?: string;
}

interface Chunk {
  id: string;
  file: string;
  title: string;
  text: string;
}

interface AskBody {
  question?: unknown;
  history?: unknown;
}

interface Exchange {
  q: string;
  a: string;
}

interface Retrieval {
  chunks: Chunk[];
  fullCorpus: boolean;
}

interface Window {
  count: number;
  resetAt: number;
}

type Theme = "light" | "dark";

type Provider = "anthropic" | "groq" | "gemini" | "openrouter";

interface ProviderInfo {
  label: string;
  keyName:
    | "anthropicApiKey"
    | "groqApiKey"
    | "geminiApiKey"
    | "openrouterApiKey";
  defaultModel: string;
  baseUrl?: string;
}

interface AnswerJson {
  answer?: unknown;
  in_scope?: unknown;
}

interface GenerateInput {
  system: string;
  documents: string;
  prompt: string;
  schema: Record<string, unknown>;
  cacheDocuments: boolean;
}

type GenerateResult = { refused: true } | { refused: false; json: AnswerJson };
