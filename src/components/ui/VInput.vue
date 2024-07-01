<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}
defineProps<Props>();

const model = defineModel<number | null | string>({ required: true });

const onInput = () => {
  if (model.value === '' || model.value === 0) {
    model.value = null;
  }
};
</script>

<template>
  <!-- eslint-disable-next-line -->
  <input
    v-model="model"
    type="number"
    class="v__input"
    :class="{ filled: model }"
    min="0"
    @input="onInput"
  />
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *

.v__input
  width: 66px
  border: 1px solid var(--border)
  border-radius: 4px
  padding: 8px 16px
  color: var(--secondary-gray)
  outline: none
  background: var(--bg-element)
  text-align: center
  font-family: Inter
  font-weight: 300
  font-size: 14px
  @media (width < $sm)
    font-size: 12px
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button
    -webkit-appearance: none
  &.filled
    color: var(--text-primary-gray)
  &:focus-visible
    border: 1px solid var(--primary-gray-reverse)

html[data-theme="dark"] .v__input:not(.filled)
  color: var(--primary-gray-dark)
</style>
