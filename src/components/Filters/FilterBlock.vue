<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { VAccordion, VIcon } from '../ui';

defineProps<{
  title: string;
}>();

const isOpen = ref(false);

const isSmallScreen = useMediaQuery('(width < 768px)');

const icon = computed(() => {
  if (isSmallScreen.value) {
    return isOpen.value ? 'minus' : 'plus';
  }
  return isOpen.value ? 'minus_big' : 'plus_big';
});
</script>

<template>
  <div>
    <div
      class="head"
      tabindex="0"
      @click="isOpen = !isOpen"
      @keyup.enter="isOpen = !isOpen"
    >
      <h1>{{ title }}</h1>
      <v-icon :icon />
    </div>
    <v-accordion :visibility="isOpen">
      <slot />
    </v-accordion>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *

.head
  display: flex
  justify-content: space-between
  margin-bottom: 24px
  cursor: pointer
  svg
    fill: var(--primary-gray-reverse)
    cursor: pointer
    user-select: none
  h1
    font-family: Cormorant SC
    font-size: 16px
    font-weight: 500
    text-transform: uppercase
    color: var(--primary-reverse)
    @media (width < $md)
      font-size: 12px
</style>
