<template>
  <div class="main">
    <Header />

    <Section title="About Me 👨🏾‍💻">
      <p>
        {{ config.public.about }}
      </p>
    </Section>

    <Section title="Work Experience 💼">
      <ul class="work-experience">
        <WorkExperience
          v-for="(item, index) in experience"
          :key="index"
          :year="item.year"
          :title="item.title"
          :description="item.description"
          :domain="item.domain"
        />
      </ul>
    </Section>

    <Section title="Recent Projects 🦺">
      <ul class="projects">
        <Project
          v-for="(item, index) in projects"
          :key="index"
          :logo="item.logo"
          :title="item.title"
          :description="item.description"
          :domain="item.domain"
          :skills="item.skills"
        />
      </ul>
    </Section>

    <Section title="Socials 🎠">
      <Footer />
    </Section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const experience = [
  {
    year: "2024 - Present",
    title: "Software Fullstack Software Engineer - Accomplishr",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://accomplishr.com",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
  {
    year: "2021 - 2023",
    title: "Frontend & Mobile Software Engineer - Microvest",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://microvest.ng",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
  {
    year: "2019 - 2021",
    title: "Fullstack Software Engineer - The Mullings Group",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://themullingsgroup.com",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
  {
    year: "2021 - 2023",
    title: "Full Stack Software Engineer - First Pavilion Technologies",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://firstpavitech.com",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
];
const projects = [
  {
    title: "OGFIMS Shop",
    logo: "/ogfims.png",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://eshop.ogfims.com",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
  {
    title: "PharmaRun",
    logo: "/pharmarun.svg",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://pharmarun.africa",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
  {
    title: "IBL",
    logo: "/octiver.png",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    domain: "https://ibl.acefinancials.com.ng",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
  {
    title: "FCRN Lagos",
    logo: "/frcn.png",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
    domain: "https://apps.apple.com/us/app/id1475269350",
  },
  {
    title: "Encrypted SMS Messaging",
    description:
      "Developed and maintained web applications using Vue.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    skills: [
      "Vue.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Nuxt.js",
    ],
  },
];
</script>

<style scoped lang="scss"></style>
