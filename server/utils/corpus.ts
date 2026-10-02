import { extractText, getDocumentProxy } from "unpdf";
import { chunkFile, chunkPdfPages, type CorpusFile } from "./chunk";

export async function readCorpusFile(file: CorpusFile) {
  const text = await useStorage("assets:corpus").getItem<string>(file);
  if (typeof text !== "string") throw new Error(`Missing corpus file: ${file}`);
  return text;
}

async function chunkCorpusFile(file: string): Promise<Chunk[]> {
  const storage = useStorage("assets:corpus");
  if (/\.pdf$/i.test(file)) {
    const raw = await storage.getItemRaw<ArrayBuffer | Uint8Array>(file);
    if (!raw) throw new Error(`Missing corpus file: ${file}`);
    const pdf = await getDocumentProxy(new Uint8Array(raw));
    const { text } = await extractText(pdf, { mergePages: false });
    return chunkPdfPages(file, text);
  }
  return chunkFile(file, await readCorpusFile(file as CorpusFile));
}

let cached: Promise<Chunk[]> | undefined;

export function loadChunks() {
  cached ??= useStorage("assets:corpus")
    .getKeys()
    .then((keys) =>
      Promise.all(
        keys.filter((k) => /\.(md|pdf)$/i.test(k)).map(chunkCorpusFile),
      ),
    )
    .then((all) => all.flat());
  cached.catch(() => (cached = undefined));
  return cached;
}
