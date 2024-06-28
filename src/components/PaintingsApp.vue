<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { getData } from '@/api/getData';
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

// prettier-ignore
const {
  authors, locations, totalPages, page, search, authorId, locationId, createdFrom, createdTo,
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
const getPaintings = async () => {
  loading.value = 'loading';
  // console.log(authorId.value, locationId.value);

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
    // prettier-ignore
    const {
      id, name, created, imageUrl,
    } = p;
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
// onBeforeMount(async () => {
//   await setAdditionalData();
//   getPaintings();
// });

const route = useRoute();
const isRouterReady = ref(false);
const router = useRouter();
router.isReady().then(() => {
  isRouterReady.value = true;
});

watch([() => route.query, isRouterReady], async () => {
  if (!isRouterReady.value) return;
  if (locations.value.length === 0 || authors.value.length === 0) {
    await setAdditionalData();
  }
  getPaintings();
});
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
  gap: 32px
  @media (width < $md)
    grid-template-columns: 1fr 1fr
  @media (width < $sm)
    grid-template-columns: 1fr

.empty
  color: var(--text-primary-gray)
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
</style>
