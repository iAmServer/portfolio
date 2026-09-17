<template>
  <div>
    <NavBar />
    <div id="top" />

    <Hero />

    <Metrics :metrics="metrics" />

    <section id="about">
      <div class="wrap">
        <div class="section-head">
          <span class="path">GET /about</span>
          <h2>About</h2>
        </div>
        <div class="panel">
          <div class="panel-bar"><span>identity.json</span><span class="code">200 OK</span></div>
          <div class="about-body">
            <p>
              I'm a senior full-stack engineer based in Moncton, NB, with ten-plus years across
              backend architecture, frontend delivery, and — increasingly — the access-control
              layer underneath both. Most of that time has gone into
              <strong>Node.js, Python, and TypeScript</strong> backends,
              <strong>React/Vue/Next.js</strong> frontends, and the identity plumbing (<strong
                >SSO, SAML, RBAC, OAuth2</strong
              >) that decides who gets to see what.
            </p>
            <p>
              The last two years pulled me deeper into applied AI: rebuilding search on
              <strong>OpenSearch vector embeddings</strong>, building a semantic expert-matching
              engine on <strong>MongoDB Vector Search</strong>, and shipping a
              <strong>LangChain RAG pipeline</strong> for document intelligence — all inside a
              product with real compliance requirements, not a weekend demo.
            </p>
            <p>
              I hold ISC2 and ISO/IEC 27001:2022 Lead Auditor certifications, and a PGD in
              Cybersecurity and Intelligence Engineering. I care about systems that stay fast and
              legible as they scale, and about handing off code a reviewer doesn't have to squint
              at.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="experience">
      <div class="wrap">
        <div class="section-head">
          <span class="path">GET /experience</span>
          <h2>Experience</h2>
        </div>
        <div class="panel">
          <div class="panel-bar">
            <span>career_history.log</span><span class="code">{{ experience.length }} entries</span>
          </div>
          <ExperienceItem
            v-for="(item, index) in experience"
            :key="index"
            :title="item.title"
            :company="item.company"
            :year="item.year"
            :domain="item.domain"
            :details="item.details"
            :skills="item.skills"
          />
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="wrap">
        <div class="section-head">
          <span class="path">GET /projects</span>
          <h2>Projects</h2>
        </div>
        <div class="proj-grid">
          <ProjectCard
            v-for="(item, index) in projects"
            :key="index"
            :path="item.path"
            :title="item.title"
            :description="item.description"
            :domain="item.domain"
            :skills="item.skills"
          />
        </div>
      </div>
    </section>

    <section id="skills">
      <div class="wrap">
        <div class="section-head">
          <span class="path">GET /skills</span>
          <h2>Skills</h2>
        </div>
        <div class="matrix">
          <SkillGroup
            v-for="group in skillGroups"
            :key="group.title"
            :title="group.title"
            :items="group.items"
          />
        </div>
      </div>
    </section>

    <section aria-label="open source and credentials">
      <div class="wrap">
        <div class="section-head">
          <span class="path">GET /credentials</span>
          <h2>Open source &amp; credentials</h2>
        </div>
        <div class="two-col">
          <ListPanel title="Open source (npm)" :rows="openSource" />
          <ListPanel title="Certifications &amp; education" :rows="credentials" />
        </div>
      </div>
    </section>

    <section id="contact" aria-label="contact">
      <div class="wrap">
        <div class="contact-panel">
          <span class="path">POST /contact</span>
          <h2>Let's talk</h2>
          <p>
            Open to senior full-stack, AI/applied ML, and identity-and-access-focused engineering
            roles — remote-friendly, based in Moncton, NB.
          </p>
          <div class="contact-row">
            <a class="btn primary" href="mailto:dasther@outlook.com">dasther@outlook.com</a>
            <a class="btn" href="https://linkedin.com/in/iamserver/" target="_blank" rel="noopener"
              >linkedin.com/in/iamserver</a
            >
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent("Home");

const metrics = [
  { num: "5s→200ms", label: "search response time, Accomplishr" },
  { num: "500k+", label: "records processed, loan platform" },
  { num: "20k+", label: "users on shipped apps" },
  { num: "30%+", label: "drop in production bugs" },
  { num: "10+ yrs", label: "production engineering" },
];

const experience = [
  {
    year: "Jan 2024 – Oct 2025",
    title: "Senior Full Stack Software Engineer",
    company: "Accomplishr",
    domain: "https://accomplishr.com",
    details: [
      "Rebuilt user search and community-feed aggregation on OpenSearch vector embeddings, cutting response times from 5s and ~3s respectively to under 200ms at scale.",
      "Designed and shipped a semantic expert-recommendation engine using MongoDB Vector Search and OpenAI embeddings, matching users by role, skills, education, and bio.",
      "Built a LangChain-based RAG pipeline for document intelligence, extending the platform's AI extraction and synthesis capabilities.",
      "Set up Google SAML SSO with role-based access control for engineering and CX teams.",
      "Designed a microservice-based payment system integrating Stripe and PayPal with embedded identity verification.",
      "Led the calendar-sync team, building two-way sync with Google and Microsoft Calendar across all product surfaces, and migrated live video from WebRTC to the Zoom API.",
      "Ran code reviews and sprint planning across two engineering teams and mentored engineers — contributing to a 30%+ drop in production bugs.",
    ],
    skills: [
      "OpenSearch",
      "MongoDB Vector Search",
      "OpenAI API",
      "LangChain",
      "NestJS",
      "SAML / RBAC",
      "Stripe",
      "GraphQL",
    ],
  },
  {
    year: "Sep 2021 – Sep 2023",
    title: "Frontend & Mobile Software Engineer",
    company: "Microvest",
    domain: "https://microvest.ng",
    details: [
      "Shipped and maintained cross-platform apps used by more than 20,000 users.",
      "Built a real-time dashboard giving internal teams visibility into customer activity.",
      "Built a Treasury module with automated reporting and access controls for financial operations.",
      "Added Cloudinary-based media optimization, improving load times for mobile users.",
    ],
    skills: ["Angular", "Ionic", "Capacitor", "Nuxt.js", "Cloudinary"],
  },
  {
    year: "Jul 2019 – Sep 2021",
    title: "Full Stack Software Engineer",
    company: "The Mullings Group",
    domain: "https://themullingsgroup.com",
    details: [
      "Designed a Node.js Pub/Sub and event-broker system, reducing sync delays in data management.",
      "Built real-time gameplay story workflows supporting an active base of 3,000+ players.",
      "Consolidated data sources behind a Python API layer, simplifying future integrations.",
      "Replaced legacy jQuery modules with React, improving stability and performance.",
    ],
    skills: ["Node.js", "Pub/Sub", "Python", "React"],
  },
  {
    year: "Sep 2015 – Apr 2019",
    title: "Full Stack Software Engineer",
    company: "First Pavilion Technologies",
    domain: "https://firstpavitech.com",
    details: [
      "Built a coworking management platform with real-time Wi-Fi access and time tracking.",
      "Created an LMS with analytics dashboards for monitoring student engagement.",
      "Improved page load speed and responsiveness across multiple client platforms.",
      "Standardized UI components and backend integrations across projects to reduce maintenance.",
    ],
    skills: ["Python", "Django", "MongoDB", "SQL"],
  },
];

const projects = [
  {
    path: "/semantic-search-rebuild",
    title: "Semantic Search Rebuild",
    description:
      "Rebuilt platform-wide user search at Accomplishr on OpenSearch vector embeddings, dropping response time from 5s to under 200ms at scale.",
    skills: ["OpenSearch", "Vector Embeddings"],
  },
  {
    path: "/expert-recommendation-engine",
    title: "Expert Recommendation Engine",
    description:
      "Production semantic-matching system on MongoDB Vector Search and OpenAI embeddings, matching users to experts by role, skills, education, and bio.",
    skills: ["MongoDB Vector Search", "OpenAI"],
  },
  {
    path: "/rag-document-summarizer",
    title: "RAG Document Summarizer",
    description:
      "Personal project: a LangChain and OpenAI-powered summarizer supporting single and batch PDF processing.",
    skills: ["LangChain", "Python", "RAG"],
  },
  {
    path: "/integrated-banking-loan",
    title: "Integrated Banking Loan Platform",
    description:
      "Loan-processing system managing 500,000+ public-servant records, cutting manual reconciliation by more than 60%.",
    domain: "https://ibl.acefinancials.com.ng",
    skills: ["Python", "SQL", "Next.js"],
  },
  {
    path: "/ogfims",
    title: "OGFIMS",
    description:
      "Platform built for the Ogun State Government to manage farmer enrollment, procurement, and farmer–buyer connections.",
    domain: "https://eshop.ogfims.org",
    skills: ["MERN", "Tailwind CSS", "NestJS"],
  },
  {
    path: "/encrypted-sms-messaging",
    title: "Encrypted SMS Messaging",
    description: "Secure messaging system with encrypted delivery and external SMS provider integration.",
    skills: ["Ionic", "Angular", "Node.js"],
  },
];

const skillGroups = [
  {
    title: "AI & LLM Engineering",
    items: ["LangChain", "OpenAI API", "Anthropic API", "RAG pipelines", "Prompt engineering"],
  },
  {
    title: "Vector Search & Retrieval",
    items: ["MongoDB Vector Search", "OpenSearch", "Pinecone", "AI embeddings"],
  },
  {
    title: "Architecture & Systems",
    items: ["Microservices", "Event-driven design", "Pub/Sub", "API design", "Scalability"],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "NestJS",
      "FastAPI",
      "Flask",
      "Python",
      "TypeScript",
      "GraphQL",
      "Kafka",
      "RabbitMQ",
    ],
  },
  {
    title: "Frontend",
    items: ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Ionic", "Tailwind CSS"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Azure", "GCP", "Docker", "Nginx", "Cloudflare", "GitHub Actions"],
  },
  {
    title: "Security & Compliance",
    items: ["GDPR", "IAM", "OAuth2", "RBAC", "SAML", "JWT", "ISO 27001", "ISC2"],
  },
  {
    title: "Databases & QA",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Jest", "Playwright"],
  },
];

const openSource = [
  {
    title: "tailwind-sidebar-expanded",
    detail:
      "Tailwind CSS plugin adding an expandable/collapsible sidebar variant for responsive layouts.",
  },
  {
    title: "ngx-countdown",
    detail:
      "Angular directive for configurable countdown timers, with target-date binding and event hooks.",
  },
  {
    title: "no-log",
    detail: "Lightweight utility that strips console logging from production builds.",
  },
];

const credentials = [
  { title: "Certified in Cybersecurity (CC)", detail: "ISC2" },
  { title: "ISO/IEC 27001:2022 Lead Auditor", detail: "Mastermind" },
  {
    title: "PGD, Cybersecurity & Intelligence Engineering",
    detail: "Ontario College of Management and Technology",
  },
  { title: "HND, Computer Science", detail: "Moshood Abiola Polytechnic" },
];
</script>

<style scoped>
.about-body {
  padding: 22px 22px 24px;
}

.about-body p {
  color: var(--text-dim);
  margin-bottom: 14px;
}

.about-body p:last-child {
  margin-bottom: 0;
}

.about-body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

.proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.matrix {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.contact-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 32px;
  text-align: center;
}

.contact-panel .path {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 11.5px;
  color: var(--text-faint);
  margin-bottom: 10px;
  display: block;
}

.contact-panel h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.contact-panel p {
  color: var(--text-dim);
  max-width: 48ch;
  margin: 0 auto 22px;
}

.contact-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 760px) {
  .proj-grid {
    grid-template-columns: 1fr;
  }
  .matrix {
    grid-template-columns: 1fr;
  }
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
