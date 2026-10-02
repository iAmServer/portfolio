<template>
  <header class="site-header">
    <div class="wrap bar">
      <a href="#top" class="brand">
        <span class="mono brand-mark">je/</span>
        <span>{{ config.public.name }}</span>
      </a>
      <nav aria-label="Primary" class="nav">
        <a href="#how">How it works</a>
        <a href="#oss">Open source</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="actions">
        <a href="#chat" class="pill ask" @click.prevent="emit('ask')">
          <span>Ask about me</span>
          <kbd class="mono">{{ shortcut }}</kbd>
        </a>
        <a href="/resume.pdf" class="pill outline" target="_blank" rel="noopener">Résumé</a>
        <button
          type="button"
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <svg
            v-if="theme === 'dark'"
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
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            />
          </svg>
          <svg
            v-else
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
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{ ask: [] }>();
const config = useRuntimeConfig();
const { theme, toggle } = useTheme();

const shortcut = ref("⌘K");
onMounted(() => {
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) shortcut.value = "Ctrl K";
});
</script>

<style scoped>
.site-header {
  border-bottom: 1px solid var(--tint);
}

.bar {
  padding-block: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
}

.brand:hover {
  text-decoration: none;
}

.brand-mark {
  font-weight: 600;
  font-size: 14px;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-weight: 500;
}

.nav a {
  padding: 8px 12px;
  border-radius: 4px;
  color: var(--fog);
}

.nav a:hover {
  color: var(--ink);
  text-decoration: none;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pill {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  min-height: 44px;
  border-radius: 9999px;
  font-size: 13px;
}

.pill:hover {
  text-decoration: none;
}

.ask {
  gap: 24px;
  background: var(--tint);
  color: var(--fog);
}

.ask:hover {
  color: var(--ink);
}

.ask kbd {
  font-size: 12px;
  font-family: var(--mono);
}

.outline {
  border: 1px solid var(--tint);
  font-weight: 500;
}

.outline:hover {
  border-color: var(--fog);
}

.icon-btn {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--tint);
  border-radius: 9999px;
  cursor: pointer;
}

.icon-btn:hover {
  border-color: var(--fog);
}

@media (max-width: 640px) {
  .nav {
    display: none;
  }
}

@media (max-width: 520px) {
  .ask kbd {
    display: none;
  }
  .ask {
    gap: 0;
  }
}
</style>
