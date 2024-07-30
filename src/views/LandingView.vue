<script setup>
import Banner from '../components/landing/Banner.vue'
import About from '../components/landing/About.vue'
import Statistics from '../components/landing/Statistics.vue'
import Contact from '../components/landing/Contact.vue'
</script>

<template>
  <main>
    <Banner />
    <About />
    <Statistics />
    <Contact />
  </main>
</template>

<style>
@import '../assets/css/sponsor.css';

main {
  width: 100%;
}
</style>