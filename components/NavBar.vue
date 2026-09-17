<template>
  <div class="topbar">
    <div class="topbar-inner">
      <a href="#top" class="brand"><span class="dot" />iamserver.dev</a>
      <nav class="routes">
        <a
          v-for="route in routes"
          :key="route.id"
          :href="`#${route.id}`"
          :class="{ active: activeId === route.id }"
        >
          {{ route.label }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
const routes = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

const activeId = ref("");
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const sections = routes
    .map((r) => document.getElementById(r.id))
    .filter((el): el is HTMLElement => Boolean(el));

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((s) => observer?.observe(s));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(10, 14, 18, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-soft);
}

.topbar-inner {
  max-width: 920px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.brand .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--white);
  flex: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.14);
}

.routes {
  display: flex;
  gap: 2px;
  overflow-x: auto;
  scrollbar-width: none;
}

.routes::-webkit-scrollbar {
  display: none;
}

.routes a {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dim);
  text-decoration: none;
  padding: 7px 10px;
  border-radius: 6px;
  white-space: nowrap;
}

.routes a:hover {
  color: var(--text);
  background: var(--surface-2);
}

.routes a.active {
  color: var(--text);
  background: var(--surface-2);
}

@media (max-width: 760px) {
  .routes a {
    padding: 6px 8px;
  }
}
</style>
