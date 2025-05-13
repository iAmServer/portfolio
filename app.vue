<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import "tailwindcss";

body {
  @apply bg-gray-900 text-white;
  font-family: "Inter", sans-serif;
}

#app {
  @apply max-w-2xl mx-auto px-4 py-8 md:py-16;
}

.main {
  @apply flex flex-col space-y-8 md:space-y-12;
}

.main p {
  @apply text-xs md:text-sm text-gray-400;
}

.profile {
  @apply flex items-center space-x-4 max-w-2xl mx-auto transition-all duration-300 ease-in-out border-b border-gray-900;
}

.scrolled {
  @apply flex fixed top-0 left-0 bg-gray-900 text-white w-full mx-auto bg-gray-900;
}

.scrolled .profile {
  @apply px-4 py-2 w-full max-w-2xl border-gray-800 bg-gray-900 space-x-2 md:space-x-4;
}

.profile img {
  @apply rounded-full w-16 md:w-24 h-16 md:h-24;
}

.scrolled .profile img {
  @apply w-10 md:w-16 h-10 md:h-16;
}

.profile-info {
  @apply flex flex-col;
}

.profile-info h1 {
  @apply md:text-2xl font-medium text-lg;
}

.scrolled .profile-info h1 {
  @apply md:text-lg text-sm;
}

.profile-info p {
  @apply text-xs text-gray-400;
}

.profile a {
  @apply text-blue-500 hover:text-blue-400 text-xs;
}

.scrolled .profile-sub {
  @apply flex flex-row justify-between items-center w-full;
}

.section {
  @apply flex flex-col space-y-2;
}

.section h2 {
  @apply text-xs md:text-sm font-medium;
}

.work-experience,
.projects {
  @apply list-none flex flex-col space-y-4;
}

.work-experience li,
.projects li {
  @apply flex items-start space-y-1 flex-col md:flex-row md:space-x-4 
    md:space-y-0;
}

.work-experience .work-experience-year {
  @apply text-gray-500 flex-shrink-0 min-w-[100px];
}

.work-experience .work-experience-details,
.projects .project-details {
  @apply flex flex-col space-y-1;
}

.work-experience .work-experience-details h2,
.work-experience .work-experience-details a,
.projects .project-details h2,
.projects .project-details a {
  @apply text-xs md:text-sm font-medium flex md:items-center;
}

.projects .project-logo {
  @apply w-12 h-12 object-contain overflow-hidden flex-shrink-0;
}

.skills {
  @apply list-none flex space-x-2 text-xs text-gray-500 flex-wrap md:flex-nowrap;
}

.skills li {
  @apply relative after:content-[''] after:block after:w-1 after:h-1 after:bg-gray-500 after:rounded-full after:absolute after:-left-2 after:top-1/2 after:-translate-y-1/2 ml-2 
    first:after:hidden first:ml-0 text-xs text-gray-600 pl-1 first:pl-0;
}

.footer {
  @apply list-none flex justify-between text-xs text-gray-500 flex-col md:flex-row 
    space-y-2 md:space-y-0 md:space-x-4;
}

.footer li {
  @apply relative after:content-['\|'] after:absolute after:-left-2 after:top-1/2 after:-translate-y-1/2 ml-2 
     text-sm text-gray-600 pl-1 md:first:pl-0;
}

.footer li a {
  @apply text-gray-500 hover:text-gray-400 flex items-center stroke-1 stroke-gray-500 
    hover:stroke-gray-400 transition-colors duration-200 ease-in-out text-xs md:text-sm;
}

.icons {
  @apply list-none flex flex-wrap space-x-2 space-y-2 text-xs text-gray-500 flex-wrap;
}

.icons li {
  @apply bg-gray-800 rounded-md p-2 flex items-center justify-center w-8 h-8 md:w-10 
    md:h-10 hover:transform hover:scale-105 transition-transform duration-200 ease-in-out;
}

.icons li svg {
  @apply w-6 h-6 md:w-7 md:h-7;
}
</style>
