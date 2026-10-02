// Pure helpers shared by the Nitro server and scripts/ingest.ts (run directly by Node),
// so keep this file free of imports and Nitro auto-imports.

export const CORPUS_FILES = ["resume.md", "projects.md", "build-writeup.md"] as const;
export type CorpusFile = (typeof CORPUS_FILES)[number];

export interface Chunk {
  /** Stable citation id, e.g. `resume.md#accomplishr`. */
  id: string;
  file: CorpusFile;
  title: string;
  text: string;
}

export function isCorpusFile(name: string): name is CorpusFile {
  return (CORPUS_FILES as readonly string[]).includes(name);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Splits a markdown file into `##` sections; text before the first one becomes the intro chunk. */
export function chunkFile(file: CorpusFile, md: string): Chunk[] {
  const chunks: Chunk[] = [];
  let title = md.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? file;
  let id: string = file;
  let lines: string[] = [];

  const flush = () => {
    const text = lines.join("\n").trim();
    if (text) chunks.push({ id, file, title, text });
    lines = [];
  };

  for (const line of md.replace(/\r/g, "").split("\n")) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flush();
      title = h2[1].trim();
      id = `${file}#${slugify(title)}`;
    }
    lines.push(line);
  }
  flush();
  return chunks;
}
