<template>
  <div id="top">
    <SiteHeader @ask="terminal?.focus()" />

    <main>
      <section class="wrap hero split">
        <AskTerminal ref="terminal" />

        <div class="intro">
          <span class="badge">Open to senior &amp; AI roles</span>
          <h1>I build systems that stay fast and secure when it matters.</h1>
          <p class="lead">
            Senior full stack engineer, 10+ years across search, payments,
            access control and real-time features. Ask the terminal anything: it
            answers from my actual documents, with sources.
          </p>
          <div class="links">
            <a href="#how">See how the terminal works &gt;</a>
            <a href="#contact" class="fog">Get in touch &gt;</a>
          </div>
        </div>
      </section>

      <section class="wrap previously" aria-labelledby="previously">
        <div id="previously" class="eyebrow">Previously building at</div>
        <ul class="companies">
          <li v-for="c in companies" :key="c.name">
            <a :href="c.url" target="_blank" rel="noopener noreferrer">{{
              c.name
            }}</a>
          </li>
        </ul>
      </section>

      <section id="how" class="wrap block split">
        <div class="stack">
          <div class="eyebrow">How the terminal works</div>
          <h2 class="h2">A small RAG system, built like production.</h2>
          <p class="muted narrow">
            Pinecone retrieval through LangChain, answered by Claude from a Nuxt
            server route. Scoped to questions about me, defended against prompt
            injection, rate-limited, and every answer cites the document it came
            from.
          </p>
          <button
            type="button"
            class="text-btn"
            @click="docs.open('build-writeup.md')"
          >
            Read the build write-up &gt;
          </button>
        </div>
        <div
          class="code-card mono"
          role="figure"
          aria-label="RAG pipeline configuration"
        >
          <div class="code-title">rag.pipeline.ts</div>
          <pre><span class="cobalt">pipeline</span>({
  <span class="cobalt">sources</span>: [<span class="plum">"resume"</span>, <span class="plum">"projects"</span>, <span class="plum">"build-writeup"</span>],
  <span class="cobalt">chunk</span>:   <span class="plum">"by-section"</span>,
  <span class="cobalt">embed</span>:   <span class="teal">PineconeEmbeddings</span>(<span class="plum">"multilingual-e5-large"</span>),
  <span class="cobalt">store</span>:   <span class="teal">PineconeStore</span>,
  <span class="cobalt">guards</span>:  [<span class="plum">"scope"</span>, <span class="plum">"injection"</span>, <span class="plum">"rate-limit"</span>],
  <span class="cobalt">answer</span>:  { <span class="cobalt">model</span>: <span class="plum">"claude"</span>, <span class="cobalt">cite</span>: <span class="rust">true</span> },
})</pre>
        </div>
      </section>

      <section id="oss" class="wrap block">
        <div class="stack tight">
          <div class="eyebrow">Open source</div>
          <h2 class="h2">Small tools, published on npm.</h2>
        </div>
        <div class="packages">
          <a
            v-for="p in packages"
            :key="p.name"
            :href="`https://www.npmjs.com/package/${p.name}`"
            target="_blank"
            rel="noopener noreferrer"
            class="package"
          >
            <span class="mono pkg-name">{{ p.name }}</span>
            <span class="muted">{{ p.detail }}</span>
          </a>
        </div>
      </section>
    </main>

    <footer id="contact" class="footer">
      <div class="wrap footer-row">
        <span class="fog">© {{ year }} {{ config.public.name }}</span>
        <div class="footer-links">
          <a href="mailto:dasther@outlook.com">dasther@outlook.com</a>
          <a
            href="https://linkedin.com/in/iamserver/"
            target="_blank"
            rel="noopener"
            >LinkedIn</a
          >
          <a href="https://github.com/iamserver" target="_blank" rel="noopener"
            >GitHub</a
          >
          <a
            href="https://www.npmjs.com/~iamserver"
            target="_blank"
            rel="noopener"
            >npm</a
          >
        </div>
      </div>
    </footer>

    <DocModal />
  </div>
</template>

<script setup lang="ts">
defineOgImage("Home");

const config = useRuntimeConfig();
const docs = useDocViewer();
const terminal = ref<{ focus: () => void }>();
const year = new Date().getFullYear();

const companies = [
  { name: "Accomplishr", url: "https://accomplishr.com" },
  { name: "Microvest", url: "https://microvest.ng" },
  { name: "The Mullings Group", url: "https://themullingsgroup.com" },
  { name: "First Pavilion", url: "https://firstpavitech.com" },
];

const packages = [
  {
    name: "tailwind-sidebar-expanded",
    detail: "Expandable/collapsible sidebar variant for Tailwind.",
  },
  {
    name: "ngx-countdown",
    detail: "Angular directive for configurable countdown timers.",
  },
  { name: "no-log", detail: "Strips console logging from production builds." },
];

function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    terminal.value?.focus();
  }
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style scoped>
.split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
  gap: 64px;
  align-items: center;
}

.hero {
  padding-top: clamp(40px, 8vw, 72px);
  padding-bottom: 64px;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.badge {
  align-self: flex-start;
  padding: 4px 8px;
  border: 1px solid var(--tint);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.056em;
  text-transform: uppercase;
  line-height: 1.4;
}

h1 {
  font-size: clamp(34px, 8vw, 48px);
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: -0.021em;
}

.lead {
  font-size: 18px;
  line-height: 1.65;
  color: var(--slate);
  max-width: 500px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 15px;
  font-weight: 500;
}

.previously {
  padding-bottom: 64px;
}

.previously .eyebrow {
  padding-top: 32px;
  border-top: 1px solid var(--tint);
  margin-bottom: 12px;
}

.companies {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  font-size: 16px;
  font-weight: 500;
  color: var(--fog);
}

.companies a:hover {
  color: var(--ink);
}

.block {
  padding-block: clamp(40px, 8vw, 64px);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stack.tight {
  gap: 8px;
  margin-bottom: 24px;
}

.muted {
  color: var(--slate);
}

.narrow {
  max-width: 460px;
}

.text-btn {
  align-self: flex-start;
  padding: 10px 0;
  min-height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
}

.text-btn:hover {
  text-decoration: underline;
}

.code-card {
  background: var(--tint);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 16px 20px;
  font-size: 14px;
  line-height: 1.8;
  overflow-x: auto;
}

.code-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.code-card pre {
  margin: 0;
  font: inherit;
}

.packages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 16px;
}

.package {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--tint);
  border-radius: 8px;
}

.package:hover {
  text-decoration: none;
  border-color: var(--fog);
}

.pkg-name {
  font-weight: 600;
}

.footer {
  border-top: 1px solid var(--tint);
}

.footer-row {
  padding-block: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-size: 13px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.footer-links a {
  color: var(--fog);
}

.footer-links a:hover {
  color: var(--ink);
}

.fog {
  color: var(--fog);
}
.cobalt {
  color: var(--cobalt);
}
.plum {
  color: var(--plum);
}
.teal {
  color: var(--teal);
}
.rust {
  color: var(--rust);
}
</style>
