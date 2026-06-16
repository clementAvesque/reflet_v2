

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/header.vue';
import Footer from './components/footer.vue';
import Intro3D from './components/Intro3D.vue';


</script>

<template>
  <Intro3D />
  <Header />
  <RouterView/>
  <Footer />
</template>

<style>
</style>
