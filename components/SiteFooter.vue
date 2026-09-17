<template>
  <footer>
    <p>© {{ year }} {{ config.public.name }} · iamserver.dev</p>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const year = new Date().getFullYear();
</script>

<style scoped>
footer {
  padding: 28px 0 40px;
  text-align: center;
}

footer p {
  font-weight: 500;
  font-size: 12px;
  color: var(--text-faint);
}
</style>
