<template>
  <header class="hero">
    <div class="wrap hero-grid">
      <div>
        <span class="eyebrow"><span class="dot" />session granted · role: visitor</span>
        <h1>{{ config.public.name }}</h1>
        <p class="role">{{ config.public.role }}</p>
        <p class="lead">{{ config.public.tagline }}</p>
        <div class="cta-row">
          <a class="btn primary" href="mailto:dasther@outlook.com">Email me →</a>
          <a
            class="btn"
            href="https://linkedin.com/in/iamserver/"
            target="_blank"
            rel="noopener"
            >LinkedIn</a
          >
          <a class="btn" href="#experience">View experience</a>
        </div>
      </div>
      <div class="token-card">
        <div class="tc-head">
          <span class="lights"><span /><span /><span /></span>GET /auth/session
        </div>
        <pre><span class="k">"sub"</span>: <span class="s">"joshua.egbeyemi"</span>,
<span class="k">"location"</span>: <span class="s">"Moncton, NB, CA"</span>,
<span class="k">"role"</span>: <span class="s">"senior_engineer"</span>,
<span class="k">"scope"</span>: [
  <span class="s">"fullstack"</span>, <span class="s">"search"</span>,
  <span class="s">"applied_ai"</span>, <span class="s">"iam"</span>
],
<span class="k">"experience_years"</span>: <span class="n">10</span>,
<span class="k">"clearance"</span>: [<span class="s">"ISC2"</span>, <span class="s">"ISO27001-LA"</span>]</pre>
        <div class="status-line"><span class="dot" />200 · access granted</div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
</script>

<style scoped>
.hero {
  padding-block: 64px 48px;
  border-bottom: 1px solid var(--border-soft);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dim);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 5px 10px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--white);
  display: inline-block;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 40px;
  align-items: start;
}

.hero h1 {
  font-size: clamp(28px, 4.4vw, 42px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin-bottom: 10px;
}

.role {
  font-size: clamp(14px, 1.8vw, 16px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin-bottom: 20px;
  line-height: 1.5;
}

.lead {
  color: var(--text-dim);
  font-size: 16px;
  max-width: 56ch;
  margin-bottom: 28px;
}

.cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.token-card {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.tc-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  font-weight: 500;
  font-size: 12px;
  color: var(--text-faint);
}

.lights {
  display: flex;
  gap: 5px;
  margin-right: 4px;
}

.lights span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}

.token-card pre {
  margin: 0;
  padding: 16px 14px;
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--text-dim);
  overflow-x: auto;
}

.token-card :deep(.k) {
  color: var(--text-faint);
}

.token-card :deep(.s) {
  color: var(--text-dim);
}

.token-card :deep(.n) {
  color: var(--white);
  font-weight: 600;
}

.status-line {
  padding: 10px 14px;
  border-top: 1px solid var(--border);
  font-weight: 600;
  font-size: 12.5px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 7px;
}

.status-line .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--white);
}

@media (max-width: 760px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
</style>
