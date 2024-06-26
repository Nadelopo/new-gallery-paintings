<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onClickOutside } from '@vueuse/core';
import { useDataStore } from '@/stores/useDataStore';
import { VSearch, VFilterButton, VIcon, VButton, VInput, VSelect } from '../ui';
import FilterBlock from './FilterBlock.vue';

const { search, createdFrom, createdTo, page, authorId, locationId, authors, locations } =
  storeToRefs(useDataStore());

const router = useRouter();
onMounted(async () => {
  await router.isReady();
  const { query } = router.currentRoute.value;
  search.value = (query.search as string) ?? '';
  authorId.value = query.author ? Number(query.author) : null;
  locationId.value = query.location ? Number(query.location) : null;
  createdFrom.value = query.from ? Number(query.from) : null;
  createdTo.value = query.to ? Number(query.to) : null;
  page.value = query.page ? Number(query.page) : 1;
});

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

const isFiltersOpen = ref(false);
const filtersRef = ref<HTMLElement>();
onClickOutside(filtersRef, () => {
  setTimeout(() => {
    isFiltersOpen.value = false;
  });
});

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
</script>

<template>
  <div class="wrapper">
    <v-search
      v-model="search"
      placeholder="Painting title"
      @clear="setQueryParams"
      @keyup.enter="setQueryParams"
      @search="setQueryParams"
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
          <form
            class="filters__container"
            @submit.prevent="setQueryParams"
          >
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
                type="submit"
              />
              <v-button
                label="clear"
                :disabled="isClearDisabled"
                @click="clear"
              />
            </div>
          </form>
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
  align-items: end
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
  @media (width < $sm)
    width: 280px
  .close
    display: flex
    button
      margin-top: 60px
      margin-left: auto
      margin-right: 100px
      padding: 0
      background: none
      border: none
      outline: none
      @media (width < $md)
        margin-right: 24px
        margin-top: 24px
      @media (width < $sm)
        margin-right: 20px
        margin-top: 20px
      svg
        fill: var(--primary-gray-reverse)
  .filters__container
    width: 320px
    margin-top: 100px
    margin-left: 40px
    @media (width < $md)
      margin-left: 32px
      margin-top: 136px
    @media (width < $sm)
      margin-top: 84px
    @media (width < $sm)
      width: 240px
      margin-left: 20px
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
