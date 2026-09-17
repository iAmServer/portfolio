<template>
  <section aria-label="highlights">
    <div class="wrap">
      <div class="metrics">
        <div v-for="metric in metrics" :key="metric.label" class="metric">
          <span class="num">{{ metric.num }}</span>
          <span class="label">{{ metric.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Metric {
  num: string;
  label: string;
}

defineProps<{ metrics: Metric[] }>();
</script>

<style scoped>
section {
  padding-block: 56px;
  border-bottom: 1px solid var(--border-soft);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.metric {
  background: var(--surface);
  padding: 20px 14px;
  text-align: center;
}

.num {
  font-variant-numeric: tabular-nums;
  font-size: clamp(17px, 2.4vw, 22px);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--white);
  display: block;
  margin-bottom: 6px;
}

.label {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.4;
}

@media (max-width: 760px) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  .metric:nth-child(5) {
    grid-column: span 2;
  }
}
</style>
