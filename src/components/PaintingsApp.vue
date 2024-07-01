<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ContentLoader } from 'vue-content-loader';
import { getData } from '@/api/getData';
import { useTheme } from '@/composables/useTheme';
import { useDataStore, type Author, type Location } from '@/stores/useDataStore';
import { VCard } from './ui';

type Painting = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

type VisiblePainting = Omit<Painting, 'authorId' | 'locationId'> & {
  author: string;
  location: string;
};

const {
  authors,
  locations,
  totalPages,
  page,
  search,
  authorId,
  locationId,
  createdFrom,
  createdTo,
} = storeToRefs(useDataStore());

const setAdditionalData = async () => {
  const [authorsResponse, locationsResponse] = await Promise.all([
    getData<Author[]>('authors'),
    getData<Location[]>('locations'),
  ]);
  if (authorsResponse.error || locationsResponse.error) return;
  authors.value = authorsResponse.data;
  locations.value = locationsResponse.data;
};

const paintings = ref<VisiblePainting[]>([]);
const desiredValue = ref('');
const loading = ref<'loading' | 'success' | 'empty'>('loading');

const setPaintings = async () => {
  loading.value = 'loading';
  const { data, error, count } = await getData<Painting[]>('paintings', {
    _limit: 6,
    _page: page.value,
    q: search.value,
    authorId: authorId.value,
    locationId: locationId.value,
    created_gte: createdFrom.value,
    created_lte: createdTo.value,
  });
  desiredValue.value = search.value;
  if (error) return;
  totalPages.value = count ?? 0;
  paintings.value = data.map((p) => {
    const author = authors.value.find((a) => a.id === p.authorId)?.name ?? '';
    const location = locations.value.find((l) => l.id === p.locationId)?.location ?? '';
    const { id, name, created, imageUrl } = p;
    return {
      id,
      name,
      created,
      imageUrl,
      author,
      location,
    };
  });
  loading.value = data.length ? 'success' : 'empty';
};

let isWatcherReady = false;
onBeforeMount(async () => {
  await setAdditionalData();
  await setPaintings();
  isWatcherReady = true;
});

const route = useRoute();
watch(
  () => route.query,
  () => {
    if (!isWatcherReady) return;
    setPaintings();
  },
);

const { isDark } = useTheme();
</script>

<template>
  <div
    v-if="loading === 'success'"
    class="cards"
  >
    <v-card
      v-for="painting in paintings"
      :key="painting.id"
      :author="painting.author"
      :location="painting.location"
      :title="painting.name"
      :year="painting.created"
      :url="painting.imageUrl"
    />
  </div>
  <div
    v-else-if="loading === 'loading'"
    class="cards"
  >
    <content-loader
      v-for="i in 6"
      :key="i"
      viewBox="0 0 392 260"
      :speed="2"
      :primary-color="isDark ? '#3c3c3c' : '#f3f3f3'"
      :secondary-color="isDark ? '#232323' : '#ecebeb'"
      class="skeleton"
    >
      <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width="100%"
        height="100%"
      />
    </content-loader>
  </div>
  <div
    v-else-if="loading === 'empty'"
    class="empty"
  >
    <div>
      No matches for <span> {{ desiredValue }}</span>
    </div>
    <div>Please try again with a different spelling or keywords.</div>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints' as *
.cards
  display: grid
  grid-template-columns: repeat(3, 1fr)
  justify-items: center
  gap: 32px
  @media (width < $md)
    grid-template-columns: 1fr 1fr
    gap: 24px
  @media (width < $sm)
    grid-template-columns: 1fr
    gap: 20px

.empty
  color: var(--text-primary-gray)
  margin-top: 60px
  > div
    font-size: 16px
    font-weight: 300
    font-family: Inter
    margin-bottom: 12px
    span
      font-weight: 500
  div:last-child
    color: var(--secondary-gray)
    font-size: 14px

.skeleton
  @media (width < $md)
    height: 220px
  @media (width < $sm)
    height: 185px
</style>
