<template>
  <div
    :class="[
      {
        scrolled: isScrolled,
        relative: !isScrolled,
      },
    ]"
  >
    <div class="profile">
      <img src="/self.jpeg" alt="Profile Picture" />
      <div class="profile-sub">
        <div class="profile-info">
          <h1>{{ config.public.name }}</h1>
          <p>{{ config.public.role }}</p>
        </div>
        <a href="resume.pdf" download>Download Resume ↓</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
