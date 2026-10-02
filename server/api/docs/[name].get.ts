export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name") ?? "";
  if (!isCorpusFile(name)) {
    throw createError({ statusCode: 404, statusMessage: "Document not found" });
  }
  setResponseHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=300");
  return readCorpusFile(name);
});
