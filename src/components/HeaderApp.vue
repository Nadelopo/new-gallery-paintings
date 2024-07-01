<script setup lang="ts">
import { computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useTheme } from '@/composables/useTheme';
import { VIcon } from './ui';

const { isDark, toggleTheme } = useTheme();

const isSmallScreen = useMediaQuery('(width < 1280px)');
const logo = computed(() => {
  return isSmallScreen.value ? 'logo' : 'logo_big';
});
</script>

<template>
  <header class="container">
    <!-- <div> -->
    <v-icon
      :icon="logo"
      class="logo"
    />
    <button
      class="theme-btn"
      type="button"
      @click="toggleTheme"
    >
      <v-icon
        v-if="isDark"
        icon="light"
      />
      <v-icon
        v-else
        icon="dark"
      />
    </button>
  </header>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *

header
  background: var(--primary)
  height: 80px
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 44px
  @media (width < $md)
    height: 88px
  @media (width < $sm)
    height: 64px
    margin-bottom: 27px
  .logo
    fill: var(--text-primary-gray)
    // @media (width < $md)
  .theme-btn
    background: var(--secondary)
    width: 40px
    height: 40px
    border-radius: 100%
    border: none
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
</style>
