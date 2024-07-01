<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { VIcon } from '../ui';

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
      <h2>{{ title }}</h2>
      <v-icon :icon />
    </div>
    <Transition name="v">
      <div
        v-if="isOpen"
        class="slot"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *

.head
  display: flex
  justify-content: space-between
  cursor: pointer
  user-select: none
  svg
    fill: var(--primary-gray-reverse)
    cursor: pointer
  h2
    font-family: Cormorant SC
    font-size: 16px
    font-weight: 500
    text-transform: uppercase
    color: var(--primary-reverse)
    @media (width < $sm)
      font-size: 12px

.slot
  margin-top: 24px

.v-enter-active,
.v-leave-active
  transition: .2s ease
  height: 36px
  margin-top: 24px
  @media (width < $sm)
    height: 33px

.v-enter-from,
.v-leave-to
  opacity: 0
  height: 0px
  margin-top: 0
</style>
