<script setup lang="ts">
import { computed, useAttrs, type InputHTMLAttributes } from 'vue';
import { VIcon } from '.';
import { debounce as Debounce } from '@/utils/debounce';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  debounce?: number;
  modelValue: string;
}

defineOptions({ inheritAttrs: false });

const props = defineProps<Props>();

const emit = defineEmits<{
  search: [];
  clear: [];
  'update:modelValue': [string];
}>();

const setModelValue = Debounce((value: string) => {
  emit('update:modelValue', value);
}, props.debounce ?? 0);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    setModelValue(value);
  },
});

const attrs = useAttrs();

const clear = () => {
  model.value = '';
  emit('update:modelValue', '');
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
      v-bind="{ ...attrs, class: undefined }"
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
  font-family: Inter
  font-size: 14px
  font-weight: 300
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
