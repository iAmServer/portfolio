# How the terminal works

A small retrieval-augmented generation (RAG) system that answers questions about my work, built with the same care I'd give a production feature.

## Why a chat instead of a résumé

Recruiters skim. A chat lets them ask the exact question they care about and get a short, direct answer in seconds, and it doubles as a working example of how I build AI features.

## How it works

- Sources: my résumé and other documents, ingested from PDFs
- Ingestion: a script extracts the text, splits it into chunks, embeds each one with Pinecone's hosted multilingual-e5-large model through LangChain and stores them in Pinecone, replacing the previous version so removed content stops being retrievable
- Retrieval: when someone asks a question, a Nuxt server route embeds it (plus the previous question, for follow-ups) and pulls the most relevant chunks from Pinecone
- Answering: the same route sends those chunks to a language model, which answers using only that material and returns a short structured reply. The model is chosen with one environment variable, and no API key ever reaches the browser
- Question log: each question and answer is saved to Pinecone as metadata, without personal identifiers, so I can see what people want to know and where my documents have gaps

## Guardrails

- Scope: questions outside my professional background get a polite refusal
- Prompt injection: document text and the visitor's question are treated as data, never instructions
- Rate limiting per IP, a question length cap and a short history window
- No phone number or private details in the documents
- When the answer is not in the documents, it says so and offers my email

## Trade-offs

The document set is small enough to fit in a single prompt, and long-context prompting with caching would be a valid, cheaper choice at this size. I built real retrieval anyway because it scales as I add documents. If Pinecone is unreachable, the route falls back to sending a bundled copy of the documents in full, so the terminal degrades instead of breaking.

## What's next

- Evaluation set of real recruiter questions with expected answers
- Hybrid keyword + vector search for exact names like product and library titles
- Using the question log to decide what to add to the documents
