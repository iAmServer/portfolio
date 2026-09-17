<template>
  <div class="job">
    <div class="job-head">
      <div>
        <span class="job-title">{{ title }}</span> ·
        <a
          v-if="domain"
          class="job-co"
          :href="domain"
          target="_blank"
          rel="noopener noreferrer"
          >{{ company }}</a
        >
        <span v-else class="job-co">{{ company }}</span>
      </div>
      <div class="job-dates">{{ year }}</div>
    </div>
    <div class="job-body">
      <ul>
        <li v-for="item in details" :key="item">{{ item }}</li>
      </ul>
      <div v-if="skills?.length" class="pills">
        <span v-for="skill in skills" :key="skill" class="pill">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProp {
  title: string;
  company: string;
  year: string;
  domain?: string;
  details: string[];
  skills?: string[];
}

defineProps<IProp>();
</script>

<style scoped>
.job {
  margin-bottom: 18px;
}

.job:last-child {
  margin-bottom: 0;
}

.job + .job {
  border-top: 1px solid var(--border);
}

.job-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px 4px;
  flex-wrap: wrap;
}

.job-title {
  font-size: 16px;
  font-weight: 700;
}

.job-co {
  color: var(--text);
  font-weight: 700;
  text-decoration: none;
}

.job-dates {
  font-weight: 500;
  font-size: 12.5px;
  color: var(--text-faint);
  white-space: nowrap;
  padding-top: 3px;
}

.job-body {
  padding: 6px 20px 18px;
}

.job-body ul {
  margin: 8px 0 0;
  padding-left: 18px;
  color: var(--text-dim);
  font-size: 14.5px;
}

.job-body li {
  margin-bottom: 7px;
}

.job-body li:last-child {
  margin-bottom: 0;
}

.pills {
  margin-top: 14px;
}
</style>
