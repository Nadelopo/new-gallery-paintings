<script setup lang="ts" generic="T">
import { ref, onUnmounted, watch, nextTick, computed } from 'vue';
import { onClickOutsideClose } from '@/composables/onClickOutsideClose';
import { VIcon } from '.';

type Option = {
  title: string;
  value: T;
};

const props = defineProps<{
  options: Option[];
  label?: string;
}>();

const model = defineModel<T | null>({ required: true });

const headRef = ref<HTMLButtonElement>();
const isActive = onClickOutsideClose(headRef);

const listRef = ref<HTMLDivElement>();
const stopScrollDocument = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isActive.value = false;
    return;
  }
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  if (e.key === 'ArrowDown') {
    const nextElement = document.activeElement?.nextElementSibling as HTMLButtonElement | null;
    const firshElement = listRef.value?.firstElementChild as HTMLButtonElement | null;
    if (nextElement) nextElement.focus();
    else firshElement?.focus();
  }
  if (e.key === 'ArrowUp') {
    const prevElement = document.activeElement?.previousElementSibling as HTMLButtonElement | null;
    const lastElement = listRef.value?.lastElementChild as HTMLButtonElement | null;
    if (prevElement) prevElement.focus();
    else lastElement?.focus();
  }
};

watch(isActive, async () => {
  if (isActive.value) {
    window.addEventListener('keydown', stopScrollDocument);
    await nextTick();
    const foundValueIndex = props.options.findIndex((o) => o.value === model.value);
    if (foundValueIndex === -1) {
      const firshElement = listRef.value?.firstElementChild as HTMLButtonElement | null;
      firshElement?.focus();
    } else {
      const children = listRef.value?.children as HTMLButtonElement[] | undefined;
      children?.[foundValueIndex + 1].focus();
    }
  } else {
    window.removeEventListener('keydown', stopScrollDocument);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', stopScrollDocument);
});

const label = computed(() => {
  const option = props.options.find((o) => o.value === model.value);
  return option?.title || (props.label ?? 'Select the value');
});
</script>

<template>
  <div class="v__wrapper">
    <button
      ref="headRef"
      class="head"
      :class="{ active: isActive, filled: model }"
      type="button"
      @click="isActive = !isActive"
    >
      <span> {{ label }}</span>
      <v-icon
        icon="expand"
        class="expand"
      />
    </button>
    <Transition name="v">
      <template v-if="isActive">
        <div
          v-if="options.length"
          ref="listRef"
          class="list"
        >
          <button
            class="option"
            :class="{ active: model === null }"
            type="button"
            @click="model = null"
          >
            all
          </button>
          <button
            v-for="(option, i) in options"
            :key="i"
            ref="listRef"
            class="option"
            :class="{ active: model === option.value }"
            type="button"
            @click="model = option.value"
          >
            {{ option.title }}
          </button>
        </div>
        <div
          v-else
          class="list empty"
        >
          There are no matching results for your query.
        </div>
      </template>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *
.v-enter-active,
.v-leave-active
  transition: 0.2s ease

.v-enter-from,
.v-leave-to
  opacity: 0
  transform: translateY(-20px)!important

.v__wrapper
  position: relative
  width: 320px
  font-family: "Inter", sans-serif
  font-weight: 300
  font-size: 14px
  @media (width < $sm)
    width: 240px
  .expand
    transition: transform 0.2s ease
    fill: var(--secondary-gray)
  &:has(.head.active)
    background: var(--bg-element)
    border-radius: 10px 10px 0px 0px
    .expand
      transform: rotate(180deg)

.head
  width: 100%
  height: 36px
  border-radius: 4px
  padding: 8px 16px
  border: 1px solid var(--border)
  background: var(--bg-element)
  color: var(--secondary-el)
  position: relative
  font-size: 14px
  outline: none
  display: flex
  justify-content: space-between
  align-items: center
  font-family: inherit
  @media (width < $sm)
    height: 33px
    font-size: 12px
  &:focus-visible, &.active
    border: 1px solid var(--primary-gray-reverse)
  &.filled
    color: var(--text-primary-gray)
  span
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

.list
  background: var(--bg-element)
  width: 100%
  position: absolute
  top: 36px
  padding-top: 12px
  border-radius: 0 0 4px 4px
  max-height: 220px
  overflow-y: auto
  z-index: 10
  @media (width < $sm)
    top: 33px
  &::-webkit-scrollbar
    width: 12px
    background: transparent
  &::-webkit-scrollbar-thumb
    background: var(--secondary-gray) content-box
    border-radius: 40px
    background-clip: content-box
    border: 4px solid transparent
  .option
    background: var(--bg-element)
    border: none
    width: 100%
    text-align: start
    font-size: 14px
    line-height: 20px
    color: var(--text-primary-gray)
    padding: 8px 16px
    display: block
    outline: none
    font-family: inherit
    @media (width < $sm)
      font-size: 12px
    &:hover, &:focus-visible, &:focus
      background: #1212120D
  &.empty
    color: var(--secondary-gray)
    padding: 20px 40px 20px 16px

html[data-theme='dark']
  .list::-webkit-scrollbar-thumb
    background: var(--primary-gray-light) content-box
  .option
    &:hover, &:focus-visible, &:focus
      background: #CDCDCD0D
  .expand
    fill: var(--primary-gray-dark)
</style>
