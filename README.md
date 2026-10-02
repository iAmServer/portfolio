# iamserver.dev

Joshua Egbeyemi's portfolio: a Nuxt site whose centrepiece is an "ask" terminal that answers questions about his work from his own documents, with sources.

## How the ask terminal works

- `server/corpus/*.md` holds the documents (résumé, projects, build write-up). Each `##` section is a chunk with a stable id such as `resume.md#accomplishr`.
- `scripts/ingest.ts` embeds every chunk with Pinecone's hosted `multilingual-e5-large` model via LangChain and writes it to a Pinecone index.
- `POST /api/ask` (`server/api/ask.post.ts`) retrieves the top-k chunks from Pinecone, asks the configured model to answer from them only, and returns `{ answer, sources }`. Cited ids that aren't in the corpus are dropped.
- `GET /api/docs/:file` serves a corpus file so source links open in the on-page viewer.
- If Pinecone isn't configured or a search fails, the route sends the whole corpus behind a prompt-cache breakpoint instead.
- Guardrails: scope and prompt-injection rules in the system prompt, a 500-character question cap, and per-IP and global in-memory rate limits (`server/utils/rateLimit.ts`).

## Choosing the AI provider

Set `NUXT_AI_PROVIDER` and that provider's key (`server/utils/llm.ts`):

| `NUXT_AI_PROVIDER` | Key variable | Default model | Cost |
| --- | --- | --- | --- |
| `anthropic` (default) | `NUXT_ANTHROPIC_API_KEY` | `claude-opus-5-5` | Paid API credits |
| `groq` | `NUXT_GROQ_API_KEY` | `llama-3.3-70b-versatile` | Free tier |
| `gemini` | `NUXT_GEMINI_API_KEY` | `gemini-2.5-flash` | Free tier |
| `openrouter` | `NUXT_OPENROUTER_API_KEY` | `meta-llama/llama-3.3-70b-instruct:free` | Free models |

`NUXT_ASK_MODEL` overrides the model. Free tiers have rate limits and model names change, so check the provider's model list if a default stops working.

## Setup

```bash
npm install
cp .env.example .env   # pick NUXT_AI_PROVIDER, set its key and NUXT_PINECONE_API_KEY
npm run ingest         # one-off: creates the Pinecone index (if needed) and loads the corpus
npm run dev
```

Run `npm run ingest` again only if you edit a file in `server/corpus/`.

## Production

```bash
npm run build
node .output/server/index.mjs
```

The ask terminal needs a server runtime, so deploy the `build` output (Node, Vercel, Netlify, etc.). `npm run generate` produces a static site without the API routes.
