export interface OpenDoc {
  file: string;
  anchor?: string;
}

/** Shared state for the markdown viewer used by the write-up link and answer sources. */
export function useDocViewer() {
  const doc = useState<OpenDoc | null>("doc-viewer", () => null);
  return {
    doc,
    open: (file: string, anchor?: string) => (doc.value = { file, anchor }),
    close: () => (doc.value = null),
  };
}
