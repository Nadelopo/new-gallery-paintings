<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

const model = defineModel<string>({ required: true });

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}
defineProps<Props>();
</script>

<template>
  <!-- eslint-disable-next-line -->
  <input type="text" v-model="model" class="v__input" :class="{ filled: model }" />
</template>

<style scoped lang="sass">
.v__input
  width: 66px
  height: 36px
  border: 1px solid var(--border)
  border-radius: 4px
  padding: 8px 16px
  color: var(--secondary-gray)
  outline: none
  background: var(--bg-element)
  &.filled
    color: var(--text-primary-gray)
  &:focus-visible
    border: 1px solid var(--primary-gray-reverse)

html[data-theme="dark"] .v__input:not(.filled)
  color: var(--primary-gray-dark)
</style>
