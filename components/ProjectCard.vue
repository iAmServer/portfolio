<template>
  <component :is="domain ? 'a' : 'div'" class="proj-card" v-bind="domain ? { href: domain, target: '_blank', rel: 'noopener noreferrer' } : {}">
    <span class="proj-path">{{ path }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div v-if="skills?.length" class="pills">
      <span v-for="skill in skills" :key="skill" class="pill">{{ skill }}</span>
    </div>
  </component>
</template>

<script lang="ts" setup>
interface IProp {
  path: string;
  title: string;
  description: string;
  domain?: string;
  skills?: string[];
}

defineProps<IProp>();
</script>

<style scoped>
.proj-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0 0 18px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

a.proj-card:hover {
  border-color: var(--text-faint);
}

.proj-path {
  font-weight: 500;
  font-size: 12px;
  color: var(--text-faint);
  padding: 12px 18px 0;
}

.proj-card h3 {
  font-size: 15.5px;
  padding: 8px 18px 0;
  font-weight: 700;
}

.proj-card p {
  color: var(--text-dim);
  font-size: 13.5px;
  padding: 8px 18px 0;
  flex: 1;
}

.proj-card .pills {
  padding: 0 18px;
  margin-top: 14px;
}
</style>
