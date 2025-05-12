<template>
  <li>
    <img v-if="logo" :src="logo" :alt="title" class="project-logo" />
    <div class="project-details">
      <h2 v-if="!domain">{{ title }}</h2>
      <a v-else :href="domain" target="_blank" rel="noopener noreferrer">
        {{ title }} <LinkArrow />
      </a>
      <p>{{ description }}</p>
      <Skills :items="skills || []" />
    </div>
  </li>
</template>

<script lang="ts" setup>
interface IProp {
  title: string;
  logo?: string;
  description: string;
  domain?: string;
  skills?: string[];
}

defineProps<IProp>();
</script>

<style></style>
