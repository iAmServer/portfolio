<template>
  <Teleport to="body">
    <div v-if="doc" class="overlay">
      <button
        type="button"
        class="scrim"
        aria-label="Close document"
        tabindex="-1"
        @click="close"
      />
      <div
        ref="dialogEl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-title"
        class="dialog"
      >
        <div class="titlebar">
          <span id="doc-title" class="mono">{{ doc.file }}</span>
          <button
            ref="closeEl"
            type="button"
            aria-label="Close"
            class="close"
            @click="close"
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
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div ref="bodyEl" class="body">
          <div v-if="status === 'pending'" class="mono fog">
            loading {{ doc.file }}…
          </div>
          <div v-else-if="status === 'error'" class="p">
            The document couldn't be loaded. Please try again.
          </div>
          <template v-for="(b, i) in blocks" v-else :key="i">
            <h2 v-if="b.kind === 'h1'" :id="b.slug" class="h2">{{ b.text }}</h2>
            <h3
              v-else-if="b.kind === 'h2'"
              :id="b.slug"
              class="h3"
              :class="{ hit: b.slug === doc.anchor }"
            >
              {{ b.text }}
            </h3>
            <h4 v-else-if="b.kind === 'h3'" class="h4">{{ b.text }}</h4>
            <div v-else-if="b.kind === 'li'" class="li">
              <span class="mono fog" aria-hidden="true">-</span
              ><span>{{ b.text }}</span>
            </div>
            <pre v-else-if="b.kind === 'code'" class="code mono">{{
              b.text
            }}</pre>
            <p v-else class="p">{{ b.text }}</p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { doc, close } = useDocViewer();
const blocks = ref<Block[]>([]);
const status = ref<"idle" | "pending" | "error">("idle");
const bodyEl = ref<HTMLElement>();
const closeEl = ref<HTMLButtonElement>();
let returnFocus: HTMLElement | null = null;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function parseMarkdown(md: string): Block[] {
  const clean = (t: string) =>
    t
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  const out: Block[] = [];
  let para: string[] = [];
  let code: string[] | null = null;
  const flush = () => {
    if (para.length) out.push({ kind: "p", text: clean(para.join(" ")) });
    para = [];
  };
  for (const line of md.replace(/\r/g, "").split("\n")) {
    if (line.trim().startsWith("```")) {
      if (code) {
        out.push({ kind: "code", text: code.join("\n") });
        code = null;
      } else {
        flush();
        code = [];
      }
      continue;
    }
    if (code) {
      code.push(line);
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    const li = line.match(/^\s*[-*]\s+(.*)$/);
    if (h) {
      flush();
      const text = clean(h[2]);
      out.push({
        kind: `h${h[1].length}` as Block["kind"],
        text,
        slug: slugify(text),
      });
    } else if (li) {
      flush();
      out.push({ kind: "li", text: clean(li[1]) });
    } else if (!line.trim()) {
      flush();
    } else {
      para.push(line.trim());
    }
  }
  if (code) out.push({ kind: "code", text: (code as string[]).join("\n") });
  flush();
  return out;
}

const cache = new Map<string, Block[]>();

watch(
  () => doc.value,
  async (d, prev) => {
    if (!d) {
      document.body.style.overflow = "";
      returnFocus?.focus();
      return;
    }
    if (!prev) returnFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    if (cache.has(d.file)) {
      blocks.value = cache.get(d.file)!;
      status.value = "idle";
    } else {
      blocks.value = [];
      status.value = "pending";
      try {
        const md = await $fetch<string>(
          `/api/docs/${encodeURIComponent(d.file)}`,
          {
            responseType: "text",
          },
        );
        cache.set(d.file, parseMarkdown(md));
        if (doc.value?.file !== d.file) return;
        blocks.value = cache.get(d.file)!;
        status.value = "idle";
      } catch {
        status.value = "error";
      }
    }

    await nextTick();
    closeEl.value?.focus();
    const target = d.anchor
      ? bodyEl.value?.querySelector<HTMLElement>(`#${CSS.escape(d.anchor)}`)
      : null;
    if (target) target.scrollIntoView({ block: "start" });
    else bodyEl.value?.scrollTo({ top: 0 });
  },
);

function onKey(e: KeyboardEvent) {
  if (doc.value && e.key === "Escape") close();
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.scrim {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: var(--scrim);
  border: none;
  cursor: pointer;
}

.dialog {
  position: relative;
  width: 100%;
  max-width: 720px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border: 1px solid var(--tint);
  border-radius: 8px;
  overflow: hidden;
}

.titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 4px 0 20px;
  background: var(--tint);
  font-size: 13px;
  font-weight: 600;
}

.close {
  min-width: 44px;
  min-height: 44px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body {
  padding: 24px clamp(20px, 5vw, 32px) 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.h2 {
  margin-bottom: 4px;
}

.h3 {
  margin: 16px 0 0;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  scroll-margin-top: 16px;
}

.h3.hit {
  color: var(--cobalt);
}

.h4 {
  margin: 8px 0 0;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
}

.p,
.li {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--slate);
}

.li {
  display: flex;
  gap: 10px;
}

.code {
  margin: 4px 0;
  padding: 16px;
  background: var(--tint);
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.8;
  color: var(--ink);
}

.fog {
  color: var(--fog);
}
</style>
