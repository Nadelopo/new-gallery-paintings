<script setup lang="ts">
// prettier-ignore
import {
  computed, onMounted, onUnmounted, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onClickOutside } from '@vueuse/core';
import { useDataStore } from '@/stores/useDataStore';
// prettier-ignore
import {
  VSearch, VFilterButton, VIcon, VButton,
  VInput, VSelect,
} from '../ui';
import FilterBlock from './FilterBlock.vue';

// prettier-ignore
const {
  search, createdFrom, createdTo, page,
} = storeToRefs(useDataStore());

// const isFiltersOpen = ref(false);

// prettier-ignore
const {
  authorId, locationId, authors, locations,
} = storeToRefs(useDataStore());
const authorOptions = computed(() =>
  authors.value.map((a) => ({
    title: a.name,
    value: a.id,
  })),
);

const locationsOptions = computed(() =>
  locations.value.map((a) => ({
    title: a.location,
    value: a.id,
  })),
);

const isClearDisabled = computed(() => {
  const isYearsEmpty = createdFrom.value === null && createdTo.value === null;
  return (
    search.value === '' && authorId.value === null && locationId.value === null && isYearsEmpty
  );
});

const router = useRouter();
const setQueryParams = () => {
  page.value = 1;
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: 1,
      search: search.value || undefined,
      author: authorId.value ?? undefined,
      location: locationId.value ?? undefined,
      from: createdFrom.value ?? undefined,
      to: createdTo.value ?? undefined,
    },
  });
};

const clear = () => {
  search.value = '';
  authorId.value = null;
  locationId.value = null;
  createdFrom.value = null;
  createdTo.value = null;
  setQueryParams();
};

const onEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    setQueryParams();
  }
};
onMounted(async () => {
  window.addEventListener('keydown', onEnter);
  await router.isReady();
  const { query } = router.currentRoute.value;
  search.value = (query.search as string) ?? '';
  authorId.value = query.author ? Number(query.author) : null;
  locationId.value = query.location ? Number(query.location) : null;
  createdFrom.value = query.from ? Number(query.from) : null;
  createdTo.value = query.to ? Number(query.to) : null;
  page.value = query.page ? Number(query.page) : 1;
});

onUnmounted(() => {
  window.removeEventListener('keydown', onEnter);
});

const isFiltersOpen = ref(false);
const filtersRef = ref<HTMLElement>();
onClickOutside(filtersRef, () => {
  setTimeout(() => {
    isFiltersOpen.value = false;
  });
});
</script>

<template>
  <div class="wrapper">
    <v-search
      v-model="search"
      class="test"
      placeholder="Painting title"
      @clear="setQueryParams"
    />
    <v-filter-button @click="isFiltersOpen = true" />
    <Teleport to="body">
      <Transition name="v">
        <div
          v-if="isFiltersOpen"
          ref="filtersRef"
          class="wrapper__filters"
        >
          <div class="close">
            <button
              type="button"
              @click="isFiltersOpen = false"
            >
              <v-icon icon="close_big" />
            </button>
          </div>
          <div class="filters__container">
            <div class="filters">
              <filter-block title="artist">
                <v-select
                  v-model="authorId"
                  :options="authorOptions"
                  label="Select the artist"
                />
              </filter-block>
              <filter-block title="location">
                <v-select
                  v-model="locationId"
                  :options="locationsOptions"
                  label="Select the location"
                />
              </filter-block>
              <filter-block title="years">
                <div class="years">
                  <v-input
                    v-model="createdFrom"
                    maxlength="4"
                    placeholder="From"
                  />
                  <v-icon icon="minus_big" />
                  <v-input
                    v-model="createdTo"
                    maxlength="4"
                    placeholder="To"
                  />
                </div>
              </filter-block>
            </div>
            <div class="actions">
              <v-button
                label="show the results"
                @click="setQueryParams"
              />
              <v-button
                label="clear"
                :disabled="isClearDisabled"
                @click="clear"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *

.v-enter-active,
.v-leave-active
  transition: 0.2s linear

.v-enter-from,
.v-leave-to
  opacity: 0
  translate: 492px

.wrapper
  display: flex
  justify-content: end
  margin-top: 44px
  margin-bottom: 20px
  gap: 20px

.wrapper__filters
  position: fixed
  top: 0
  right: 0
  width: 492px
  height: 100%
  color: #fff
  background: var(--secondary-white)
  @media (width < $md)
    width: 372px
  .close
    display: flex
    button
      margin-top: 60px
      margin-left: auto
      margin-right: 100px
      background: none
      border: none
      outline: none
      @media (width < $md)
        margin-left: auto
        margin-right: 20px
      svg
        fill: var(--primary-gray-reverse)
  .filters__container
    width: 320px
    margin-top: 100px
    margin-left: 40px
    @media (width < $md)
      margin-left: 32px
    @media (width < $sm)
      width: 240px
    .filters
      display: flex
      flex-direction: column
      gap: 32px
      height: 310px
      @media (width < $sm)
        height: 280px
      .years
        display: flex
        gap: 8px
        align-items: center
        svg
          fill: var(--secondary-el)
    .actions
      display: flex
      justify-content: space-between
      margin-top: 200px
      @media (width < $sm)
        margin-top: 60px

html[data-theme="dark"] .wrapper__filters
  background: var(--primary-black)
</style>
