<template>
  <ul class="skills" v-if="items.length">
    <li v-for="skill in items" :key="skill">
      {{ skill }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface IProp {
  items: string[];
}

defineProps<IProp>();
</script>

<style></style>
