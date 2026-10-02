interface Source {
  id: string;
  file: string;
  title: string;
}

interface Entry {
  q: string;
  a?: string;
  sources?: Source[];
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
  file: CorpusFile;
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
