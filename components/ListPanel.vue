<template>
  <div class="list-panel">
    <h3>{{ title }}</h3>
    <div v-for="row in rows" :key="row.title" class="row-item">
      <div class="rt">{{ row.title }}</div>
      <div class="rd">{{ row.detail }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Row {
  title: string;
  detail: string;
}

defineProps<{ title: string; rows: Row[] }>();
</script>

<style scoped>
.list-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px 20px;
}

.list-panel h3 {
  font-weight: 700;
  font-size: 12.5px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 14px;
}

.row-item {
  padding: 10px 0;
  border-top: 1px solid var(--border-soft);
}

.row-item:first-of-type {
  border-top: none;
  padding-top: 0;
}

.rt {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 3px;
}

.rd {
  color: var(--text-dim);
  font-size: 13px;
}
</style>
