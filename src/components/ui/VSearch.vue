<script setup lang="ts">
import { useAttrs, type InputHTMLAttributes } from 'vue';
import { VIcon } from '.';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<Props>();

const model = defineModel<string>({ required: true });

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  search: [];
  clear: [];
}>();

const attrs = useAttrs();

const clear = () => {
  model.value = '';
  emit('clear');
};
</script>

<template>
  <div
    class="v__wrapper"
    :class="attrs.class"
  >
    <!-- eslint-disable-next-line -->
    <input
      v-model="model"
      type="text"
      class="search"
      v-bind="{ ...attrs, class: { filled: model } }"
    />
    <v-icon
      icon="search"
      class="search__icon"
      fill="var(--text-primary-gray)"
      @click="emit('search')"
    />
    <v-icon
      v-if="model"
      icon="close"
      class="close__icon"
      fill="var(--text-primary-gray)"
      @click="clear"
    />
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *

.v__wrapper
  position: relative
  width: 340px
  height: 100%
  @media (width < $md)
    width: 296px
  @media (width < $sm)
    width: 224px


.search
  width: 100%
  border-radius: 4px
  padding: 8px 48px
  border: 1px solid var(--border)
  background: var(--bg-element)
  color: var(--secondary-el)
  outline: none
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  font-family: Inter
  font-size: 14px
  font-weight: 300
  @media (width < $sm)
    font-size: 12px
  &:focus-visible
    border: 1px solid var(--primary-gray-reverse)
  &.filled
    color: var(--text-primary-gray)

.search__icon
  position: absolute
  left: 16px
  top: 8px
  cursor: pointer

.close__icon
  position: absolute
  top: 12px
  right: 16px
  cursor: pointer
</style>
