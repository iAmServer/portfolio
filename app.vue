<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Apply the saved/system theme before first paint so there's no flash.
useHead({
  script: [
    {
      key: "theme-init",
      tagPosition: "head",
      innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`,
    },
  ],
});
</script>

<style>
:root {
  --bg: #ffffff;
  --ink: #303055;
  --slate: #403f53;
  --fog: #767682;
  --tint: #e8e8f2;
  --cobalt: #3b61b0;
  --plum: #8844ae;
  --teal: #096e72;
  --rust: #984e4d;
  --scrim: rgba(48, 48, 85, 0.45);
  --shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04);
  --sans: "Rubik", "Helvetica Neue", sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, monospace;
  color-scheme: light;
}

:root[data-theme="dark"] {
  --bg: #14141f;
  --ink: #e6e6f2;
  --slate: #b9b9ca;
  --fog: #9c9cac;
  --tint: #2a2a3d;
  --cobalt: #8faaf0;
  --plum: #c99ae8;
  --teal: #5fc9c9;
  --rust: #e39290;
  --scrim: rgba(0, 0, 0, 0.6);
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1,
h2,
h3,
p {
  margin: 0;
}

#app {
  min-height: 100vh;
}

a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--cobalt);
  outline-offset: 2px;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: clamp(20px, 5vw, 32px);
}

.eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.056em;
  text-transform: uppercase;
  line-height: 1.4;
  color: var(--fog);
}

.h2 {
  font-size: clamp(26px, 6vw, 32px);
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -0.021em;
}

.mono {
  font-family: var(--mono);
  letter-spacing: -0.021em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
