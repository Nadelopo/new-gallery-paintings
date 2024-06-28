<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
import { VIcon } from '.';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}
defineProps<Props>();
</script>

<template>
  <button
    type="button"
    class="v__filter-button"
  >
    <v-icon icon="filter" />
  </button>
</template>

<style scoped lang="sass">
.v__filter-button
  width: 36px
  height: 36px
  background: var(--secondary)
  border-radius: 4px
  padding: 6px
  border: none
  &:focus-visible, &:hover, &:active
    background: #1212120D
    svg
      fill: var(--primary-reverse)
  svg
    fill: var(--primary-gray-reverse)

html[data-theme="dark"] .v__filter-button:hover
  background: #CDCDCD0D
</style>
