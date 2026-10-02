export const CORPUS_FILES = [
  "resume.md",
  "projects.md",
  "build-writeup.md",
] as const;

export type CorpusFile = (typeof CORPUS_FILES)[number];

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

const MAX_PDF_CHUNK = 1200;

// PDFs have no reliable headings, so pack paragraphs into ~1200 char chunks per page.
export function chunkPdfPages(file: string, pages: string[]): Chunk[] {
  const chunks: Chunk[] = [];
  const name = file.replace(/\.pdf$/i, "");

  pages.forEach((page, i) => {
    const pieces = page
      .replace(/\r/g, "")
      .split(/\n\s*\n/)
      .flatMap((block) =>
        block.length > MAX_PDF_CHUNK ? block.split("\n") : [block],
      )
      .map((b) => b.trim())
      .filter(Boolean);

    let buffer = "";
    let n = 0;
    const flush = () => {
      if (!buffer) return;
      chunks.push({
        id: `${file}#p${i + 1}-${++n}`,
        file,
        title: `${name} (page ${i + 1})`,
        text: buffer,
      });
      buffer = "";
    };
    for (const piece of pieces) {
      if (buffer && buffer.length + piece.length + 1 > MAX_PDF_CHUNK) flush();
      buffer = buffer ? `${buffer}\n${piece}` : piece;
    }
    flush();
  });
  return chunks;
}
