<script setup lang="ts">
import { useAttrs, type InputHTMLAttributes } from 'vue';
import { VIcon } from '.';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

defineOptions({ inheritAttrs: false });

defineProps<Props>();

const model = defineModel<string>({ required: true });

const emit = defineEmits<{
  search: [];
  clear: [];
}>();

const attrs = useAttrs();
</script>

<template>
  <div class="v__wrapper" :class="attrs.class">
    <!-- eslint-disable-next-line -->
    <input v-model="model" type="text" class="search" v-bind="{ ...attrs, class: undefined }" />
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
      @click="emit('clear'), (model = '')"
    />
  </div>
</template>

<style scoped lang="sass">
.v__wrapper
  position: relative
  width: 340px
  height: 36px

.search
  width: 100%
  height: 100%
  border-radius: 4px
  padding: 8px 48px
  border: 1px solid var(--border)
  background: var(--bg-element)
  color: var(--text-primary-gray)
  outline: none
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  &:focus-visible
    border: 1px solid var(--primary-gray-reverse)

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
