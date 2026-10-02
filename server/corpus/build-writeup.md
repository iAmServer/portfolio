# How the terminal works

A small retrieval-augmented generation (RAG) system that answers questions about my work, built with the same care I'd give a production feature.

## Why a chat instead of a résumé

Recruiters skim. A chat lets them ask the exact question they care about and get a sourced answer in seconds, and it doubles as a working example of how I build AI features.

## Architecture

- Sources: résumé, project write-ups and this write-up, stored as markdown in the repo
- Chunking: split by section, each chunk tagged with a stable id like resume.md#accomplishr
- Ingestion: a script embeds every chunk with Pinecone's hosted multilingual-e5-large model through LangChain and replaces the index namespace, so removed sections stop being retrievable
- Retrieval: a Nuxt server route embeds the question (plus the previous one, for follow-ups) and pulls the top-k sections from Pinecone with LangChain's PineconeStore
- Answering: the same route calls Claude through the Anthropic SDK, so no API key reaches the browser. The model answers using only the retrieved sections and returns structured JSON: the answer plus the chunk ids it used
- The server drops any cited id that isn't in the deployed corpus, so every source link opens a real document

## Guardrails

- Scope: questions outside my professional background get a polite refusal
- Prompt injection: document text and the visitor's question are treated as data, never instructions
- Rate limiting per IP, a question length cap and a short history window
- No phone number or private details in the corpus
- When the answer is not in the documents, it says so and offers my email

## Trade-offs

The corpus is small enough to fit in a single prompt, and long-context prompting with caching would be a valid, cheaper choice at this size. I built real retrieval anyway because it scales as I add write-ups and keeps citations tight. If Pinecone is unreachable, the route falls back to sending the whole corpus behind a prompt-cache breakpoint, so the terminal degrades instead of breaking.

```
pipeline({
  sources:  ["resume", "projects", "build-writeup"],
  chunk:    "by-section",
  embed:    PineconeEmbeddings("multilingual-e5-large"),
  store:    PineconeStore,
  guards:   ["scope", "injection", "rate-limit"],
  answer:   { model: "claude", cite: true },
})
```

## What's next

- Evaluation set of real recruiter questions with expected answers
- Hybrid keyword + vector search for exact names like product and library titles
