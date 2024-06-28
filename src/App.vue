<script setup lang="ts">
import HeaderApp from '@/components/HeaderApp.vue';
import PaintingsApp from './components/PaintingsApp.vue';
import FiltersApp from './components/Filters/FiltersApp.vue';
import PaginationApp from './components/PaginationApp.vue';
</script>

<template>
  <header-app />
  <main class="container">
    <filters-app />
    <paintings-app />
    <pagination-app />
  </main>
</template>

<style scoped lang="sass"></style>
