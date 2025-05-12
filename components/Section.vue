<template>
  <div v-bind="$attrs" class="section">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface IProp {
  title: string;
}

withDefaults(defineProps<IProp>(), {
  title: "Section Title",
});
</script>

<style></style>
