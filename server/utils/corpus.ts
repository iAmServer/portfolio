import { CORPUS_FILES, chunkFile, type Chunk, type CorpusFile } from "./chunk";

export async function readCorpusFile(file: CorpusFile) {
  const text = await useStorage("assets:corpus").getItem<string>(file);
  if (typeof text !== "string") throw new Error(`Missing corpus file: ${file}`);
  return text;
}

let cached: Promise<Chunk[]> | undefined;

export function loadChunks() {
  cached ??= Promise.all(
    CORPUS_FILES.map(async (file) => chunkFile(file, await readCorpusFile(file))),
  ).then((all) => all.flat());
  // Don't keep a rejected promise around; let the next request retry.
  cached.catch(() => (cached = undefined));
  return cached;
}
