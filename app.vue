<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --bg: #0a0a0a;
  --surface: #131313;
  --surface-2: #1d1d1d;
  --border: #2c2c2c;
  --border-soft: #1e1e1e;
  --text: #f1f1f1;
  --text-dim: #9b9b9b;
  --text-faint: #6a6a6a;
  --white: #ffffff;
  --code-bg: #0e0e0e;
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
  color: var(--text);
  font-family: "Inter", -apple-system, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--white);
  color: #0a0a0a;
}

a {
  color: inherit;
}

h1,
h2,
h3 {
  margin: 0;
}

p {
  margin: 0;
}

img {
  max-width: 100%;
}

#app {
  min-height: 100vh;
}

.wrap {
  max-width: 920px;
  margin: 0 auto;
  padding-inline: 24px;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
}

.btn {
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  padding: 11px 18px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    border-color 0.15s,
    background 0.15s;
}

.btn.primary {
  background: var(--white);
  border-color: var(--white);
  color: #0a0a0a;
  font-weight: 700;
}

.btn.primary:hover {
  background: #d9d9d9;
}

.btn:not(.primary):hover {
  border-color: var(--text-faint);
  background: var(--surface);
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  font-weight: 500;
  font-size: 12px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: 4px 9px;
  border-radius: 100px;
}

section {
  padding-block: 56px;
  border-bottom: 1px solid var(--border-soft);
}

section:last-of-type {
  border-bottom: none;
}

.section-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.section-head .path {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 11.5px;
  color: var(--text-faint);
  letter-spacing: 0.06em;
}

.section-head h2 {
  font-size: 22px;
  font-weight: 700;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.panel-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  font-weight: 500;
  font-size: 12px;
  color: var(--text-faint);
  background: var(--surface-2);
}

.panel-bar .code {
  color: var(--text);
  font-weight: 600;
}
</style>
