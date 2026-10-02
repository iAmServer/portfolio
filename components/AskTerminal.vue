<!-- eslint-disable vue/html-self-closing -->
<template>
  <div id="chat" class="terminal mono">
    <div class="tabbar">
      <span class="tab">ask.sh</span>
      <span class="hint">grounded in my docs</span>
    </div>

    <div ref="logEl" class="log" aria-live="polite">
      <div v-for="(entry, i) in entries" :key="i" class="entry">
        <div>
          <span class="fog">&gt;</span> <span class="cobalt">ask</span>
          <span class="plum">"{{ entry.q }}"</span>
        </div>
        <div v-if="entry.pending" class="body fog">thinking…</div>
        <div v-else-if="entry.error" class="body rust">{{ entry.error }}</div>
        <template v-else>
          <div class="body">{{ entry.a }}</div>
          <div v-if="entry.sources?.length" class="body sources">
            <span class="teal">sources</span>
            <button
              v-for="s in entry.sources"
              :key="s.id"
              type="button"
              class="source"
              :title="s.title"
              @click="openSource(s)"
            >
              {{ s.id }}
            </button>
          </div>
        </template>
      </div>
    </div>

    <form class="prompt" @submit.prevent="submit">
      <label for="ask" class="label"
        ><span class="fog">&gt;</span> <span class="cobalt">ask</span></label
      >
      <input
        id="ask"
        ref="inputEl"
        v-model="question"
        type="text"
        autocomplete="off"
        maxlength="500"
        placeholder="type a question about my work…"
        :disabled="busy"
      />
      <button
        type="submit"
        aria-label="Send question"
        class="send"
        :disabled="busy || !question.trim()"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
    <p class="notice">
      Questions are logged without personal identifiers so I can see what people
      ask.
    </p>
  </div>
</template>

<script setup lang="ts">
const docs = useDocViewer();

const entries = ref<Entry[]>([
  // {
  //   q: "Has he built payment systems?",
  //   a: "Yes. At Accomplishr he designed a microservice-based payment system for every product feature: Stripe and PayPal, with built-in identity verification.",
  //   sources: [
  //     { id: "resume.md#accomplishr", file: "resume.md", title: "Accomplishr" },
  //     {
  //       id: "projects.md#payments-platform",
  //       file: "projects.md",
  //       title: "Payments platform",
  //     },
  //   ],
  //   example: true,
  // },
  {
    q: "Biggest performance win?",
    a: "Rebuilt user search on OpenSearch vector embeddings. Average response: 5s → <200ms.",
    sources: [
      {
        id: "projects.md#semantic-search-rebuild",
        file: "projects.md",
        title: "Semantic search rebuild",
      },
    ],
    example: true,
  },
]);

const question = ref("");
const busy = ref(false);
const logEl = ref<HTMLElement>();
const inputEl = ref<HTMLInputElement>();

function openSource(s: Source) {
  docs.open(s.file, s.id.split("#")[1]);
}

async function scrollToEnd() {
  await nextTick();
  logEl.value?.scrollTo({ top: logEl.value.scrollHeight, behavior: "smooth" });
}

async function submit() {
  const q = question.value.trim();
  if (!q || busy.value) return;

  const history = entries.value
    .filter((e) => !e.example && e.a)
    .slice(-3)
    .map((e) => ({ q: e.q, a: e.a! }));

  const entry = reactive<Entry>({ q, pending: true });
  entries.value.push(entry);
  question.value = "";
  busy.value = true;
  scrollToEnd();

  try {
    const res = await $fetch<{ answer: string; sources: Source[] }>(
      "/api/ask",
      {
        method: "POST",
        body: { question: q, history },
      },
    );
    entry.a = res.answer;
    entry.sources = res.sources;
  } catch (err: unknown) {
    const e = err as {
      statusMessage?: string;
      data?: { statusMessage?: string };
    };
    entry.error =
      e.data?.statusMessage ||
      e.statusMessage ||
      "Something went wrong. Try again.";
  } finally {
    entry.pending = false;
    busy.value = false;
    scrollToEnd();
    await nextTick();
    inputEl.value?.focus();
  }
}

function focus() {
  inputEl.value?.scrollIntoView({ behavior: "smooth", block: "center" });
  inputEl.value?.focus({ preventScroll: true });
}

defineExpose({ focus });
</script>

<style scoped>
.terminal {
  background: var(--bg);
  border: 1px solid var(--tint);
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
  font-size: 14px;
  line-height: 1.8;
}

.tabbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-right: 12px;
  background: var(--tint);
}

.tab {
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  min-height: 44px;
  display: flex;
  align-items: center;
  background: var(--bg);
  color: var(--ink);
  border-radius: 8px 8px 0 0;
}

.hint {
  font-size: 12px;
  color: var(--fog);
}

.log {
  padding: 16px 20px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 420px;
  overflow-y: auto;
}

.body {
  padding-left: 16px;
  color: var(--slate);
  white-space: pre-wrap;
}

.sources {
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;
}

.source {
  font: inherit;
  font-weight: 600;
  padding: 0;
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
}

.source:hover {
  text-decoration: underline;
}

.prompt {
  padding: 18px 20px 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--tint);
  margin-top: 8px;
}

.label {
  white-space: nowrap;
}

.prompt input {
  flex-grow: 1;
  min-width: 0;
  font: inherit;
  padding: 8px 10px;
  min-height: 44px;
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--tint);
  border-radius: 4px;
}

.prompt input::placeholder {
  color: var(--fog);
}

.send {
  min-width: 44px;
  min-height: 44px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--tint);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send:disabled {
  color: var(--fog);
  cursor: default;
}

.notice {
  padding: 0 20px 14px;
  font-family: var(--sans);
  font-size: 12px;
  line-height: 1.5;
  color: var(--fog);
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
