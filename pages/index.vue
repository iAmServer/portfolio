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
          :skills="item.skills"
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
      "A platform that facilicates growth on both the personal and professional level through mentorship and coaching.",
    domain: "https://accomplishr.com",
    skills: [
      "FastAPI",
      "Python",
      "Nuxt.js",
      "MongoDB",
      "WebSockets",
      "WebRTC",
      "React.js",
    ],
  },
  {
    year: "2021 - 2023",
    title: "Frontend & Mobile Software Engineer - Microvest",
    description:
      "A fintech solution that encourages savings and investment in the Nigerian economy. It provides a platform for users to save and invest in various financial products.",
    domain: "https://microvest.ng",
    skills: [
      "Angular",
      "Payment Integration",
      "ionic",
      "Java",
      "Microservices",
      "Caching",
      "Cloudinary",
    ],
  },
  {
    year: "2019 - 2021",
    title: "Fullstack Software Engineer - The Mullings Group",
    description:
      "A consulting firm that brings tech and business together and promotes the use of technology in business.",
    domain: "https://themullingsgroup.com",
    skills: ["Meteor.js", "React.js", "MQTT", "PubSub", "Angular", "Python"],
  },
  {
    year: "2021 - 2023",
    title: "Full Stack Software Engineer - First Pavilion Technologies",
    description:
      "A cutting-edge ICT company that transforms your tech challenges into innovative solutions with precision and speed, delivers high-quality results under pressure, ensuring your vision becomes reality with futuristic flair.",
    domain: "https://firstpavitech.com",
    skills: ["Python", "Nuxt.js", "MongoDB", "Docker", "Django", "SQL"],
  },
];
const projects = [
  {
    title: "OGFIMS Shop",
    logo: "/ogfims.png",
    description:
      "A marketplace for farmers and buyers to connect, facilitating the sale of agricultural products and services.",
    domain: "https://eshop.ogfims.com",
    skills: ["MERN", "Tailwind CSS", "Nest.js", "SCSS", "Vite.js", "DevOps"],
  },
  {
    title: "PharmaRun",
    logo: "/pharmarun.svg",
    description:
      "Pharmarun is an ondemand platform offering convenient medication delivery, expert consultations, and personalized medication management.",
    domain: "https://pharmarun.africa",
    skills: [
      "Nest.js",
      "RabbitMQ",
      "Redis",
      "MongoDB",
      "Microservices",
      "React.js",
    ],
  },
  {
    title: "IBL",
    logo: "/octiver.png",
    description:
      "Robust Loan Management solution processing over 20k loans per month for over 500k users and also handles collections and repayments.",
    domain: "https://ibl.acefinancials.com.ng",
    skills: ["Next.js", "React.js", "Python", "SQL", "Zustand"],
  },
  {
    title: "FCRN Lagos",
    logo: "/frcn.png",
    description:
      "Live streaming radio app with a focus on user experience and performance.",
    skills: ["ionic", "iOS", "Android", "Angular", "Capacitor"],
    domain: "https://apps.apple.com/us/app/id1475269350",
  },
  {
    title: "Encrypted SMS Messaging",
    description:
      "Secure messaging with Ionic/Node.js, encrypting data and blocking unauthorized access.",
    skills: [
      "ionic",
      "Angular",
      "Android",
      "Capacitor",
      "Node.js",
      "Encryption",
    ],
  },
];
</script>

<style scoped lang="scss"></style>
