<!-- eslint-disable vue/html-self-closing -->
<template>
  <div id="chat" class="terminal mono">
    <div class="tabbar">
      <span class="tab">ask.sh</span>
      <span class="hint">grounded in my docs</span>
    </div>

    <div ref="logEl" class="log" aria-live="polite">
      <div v-for="(entry, i) in entries" :key="i" class="entry">
        <div class="q">
          <span class="fog">&gt;</span> <span class="cobalt">ask</span>
          <span class="plum">"{{ entry.q }}"</span>
        </div>
        <div v-if="entry.pending" class="body fog">thinking…</div>
        <div v-else-if="entry.error" class="body rust">{{ entry.error }}</div>
        <template v-else>
          <div class="body">{{ entry.a }}</div>
        </template>
      </div>

      <div v-if="!asked" class="suggestions">
        <span class="fog">try</span>
        <button
          v-for="s in suggestions"
          :key="s"
          type="button"
          class="suggestion"
          @click="ask(s)"
        >
          {{ s }}
        </button>
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
const entries = ref<Entry[]>([
  {
    q: "Biggest performance win?",
    a: "Rebuilt user search on OpenSearch vector embeddings. Average response: 5s → <200ms.",
    example: true,
  },
]);

const suggestions = [
  "Has he built payment systems?",
  "What AI work has he shipped?",
  "Is he open to remote roles?",
];
const asked = computed(() => entries.value.some((e) => !e.example));

const question = ref("");
const busy = ref(false);
const logEl = ref<HTMLElement>();
const inputEl = ref<HTMLInputElement>();

async function scrollToEnd() {
  await nextTick();
  logEl.value?.scrollTo({ top: logEl.value.scrollHeight, behavior: "smooth" });
}

function ask(q: string) {
  question.value = q;
  submit();
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
    const res = await $fetch<{ answer: string }>("/api/ask", {
      method: "POST",
      body: { question: q, history },
    });
    entry.a = res.answer;
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
  display: flex;
  flex-direction: column;
  height: 460px;
}

.tabbar,
.prompt,
.notice {
  flex: none;
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
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.q .plum {
  margin-left: 1ch;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.suggestion {
  font: inherit;
  font-size: 13px;
  padding: 6px 12px;
  min-height: 44px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--tint);
  border-radius: 9999px;
  cursor: pointer;
  text-align: left;
}

.suggestion:hover {
  border-color: var(--fog);
}

.body {
  padding-left: 16px;
  color: var(--slate);
  white-space: pre-wrap;
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

@media (max-width: 640px) {
  .terminal {
    height: 420px;
    font-size: 13px;
  }
}
</style>
