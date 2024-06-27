<script setup lang="ts">
import { computed } from 'vue';
import { arrayRange } from '@/utils/arrayRange';
import { VIcon } from '.';

type PageSlots = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

const props = defineProps<{
  itemCount: number;
  pageSize: number;
  pageSlots?: PageSlots;
}>();

const emit = defineEmits<{
  click: [];
}>();

const currentPage = defineModel<number>({ required: true });

const pageCount = computed(() => Math.ceil(props.itemCount / props.pageSize));

const items = computed(() => {
  const count = pageCount.value;
  const currentPageValue = currentPage.value;
  const pageSlots = props.pageSlots ?? 7;
  const isSlotsEven = pageSlots % 2 === 0;
  const withOtherPrefPages = Math.ceil(pageSlots / 2);
  const togglePagesCount = pageSlots - 4;
  const middlePageIndex = Math.floor(togglePagesCount / 2);

  if (count <= pageSlots) return arrayRange(1, count + 1);

  const isStartPosition = currentPageValue <= withOtherPrefPages;
  if (isStartPosition) {
    return [...arrayRange(1, pageSlots - 1), 0, count];
  }

  const isMiddlePosition = currentPageValue <= count - (withOtherPrefPages + (isSlotsEven ? 2 : 1));
  if (isMiddlePosition) {
    let minPage = currentPageValue - middlePageIndex;
    const maxPage = currentPageValue + middlePageIndex + 1;
    if (isSlotsEven) {
      minPage += 1;
    }
    return [1, -1, ...arrayRange(minPage, maxPage), 0, count];
  }
  return [1, -1, ...arrayRange(count - (pageSlots - 3), count + 1)];
});

const setPrev = () => {
  currentPage.value -= 1;
  emit('click');
};

const setNext = () => {
  currentPage.value += 1;
  emit('click');
};

const setPage = (page: number) => {
  currentPage.value = page;
  emit('click');
};
</script>

<template>
  <div v-if="itemCount !== 0" class="v__pagination">
    <button type="button" :disabled="currentPage === 1" class="prev" @click="setPrev">
      <v-icon icon="arrow" transform="rotate(180)" />
    </button>
    <template v-for="(value, i) in items" :key="i">
      <button
        v-if="value > 0"
        type="button"
        :class="{ active: currentPage === value }"
        @click="setPage(value)"
      >
        {{ value }}
      </button>
      <template v-else>
        <button class="page-switch" type="button">...</button>
      </template>
    </template>
    <button type="button" :disabled="currentPage === pageCount" class="next" @click="setNext">
      <v-icon icon="arrow" />
    </button>
  </div>
</template>

<style scoped lang="sass">

.v__pagination
  display: flex
  gap: 6px
  .prev, .next
    display: flex
    justify-content: center
    align-items: center
    &:hover
      background: #1212120D
    svg
      fill: var(--text-primary-gray)

  .prev
    margin-right: 16px
  .next
    margin-left: 16px
  button
    border: none
    background: var(--primary)
    border-radius: 4px
    width: 24px
    height: 24px
    padding: 0
    position: relative
    color: var(--text-primary-gray)
    font-family: Inter
    font-size: 16px
    font-weight: 300
    &:hover:not(.active):not(.prev):not(.next):not(.page-switch)
      font-weight: 500
      &::after
        content: ''
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        height: 1px
        background: var(--secondary-gray)

    &.active
      background: var(--primary-reverse)
      background: #1212120D
      font-weight: 500

html[data-theme="dark"] .v__pagination button
  &.active
    background: var(--secondary-black)
  &:hover::after
    background: var(--primary-gray-dark)
</style>
