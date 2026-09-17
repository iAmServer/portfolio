<template>
  <div class="scope-group">
    <h3>{{ title }}</h3>
    <div class="scope-list">
      <span v-for="item in items" :key="item" class="scope-tag">{{ item }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; items: string[] }>();
</script>

<style scoped>
.scope-group {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 18px;
}

.scope-group h3 {
  font-size: 12.5px;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  font-weight: 700;
}

.scope-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.scope-tag {
  font-size: 12.5px;
  color: var(--text-dim);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 5px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.scope-tag::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-faint);
  flex: none;
}
</style>
