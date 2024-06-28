<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  label: string;
}

defineProps<Props>();
</script>

<template>
  <button
    type="button"
    class="v__button"
  >
    {{ label }}
  </button>
</template>

<style scoped lang="sass">

.v__button
  background: transparent
  border: none
  border-bottom: 1px solid var(--primary-gray-reverse)
  color: var(--primary-gray-reverse)
  padding: 0
  font-size: 12px
  font-weight: 700
  font-family: Inter
  line-height: 15px
  outline: none
  text-transform: uppercase
  &:focus-visible, &:active, &:hover
    color: var(--primary-reverse)
    border-bottom: 1px solid var(--primary-reverse)
  &:disabled
    color: var(--secondary-gray)
    border-bottom: 1px solid var(--secondary-gray)

html[data-theme="dark"] .v__button
  &:disabled
    color: var(--primary-gray-dark)
    border-bottom: 1px solid var(--primary-gray-dark)
</style>
