<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { VPagination } from '@/components/ui';
import { useDataStore } from '@/stores/useDataStore';

const { totalPages, page } = storeToRefs(useDataStore());

const router = useRouter();

const setQuery = () => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: page.value,
    },
  });
};
</script>

<template>
  <v-pagination
    v-model="page"
    :item-count="totalPages"
    :page-size="6"
    class="pagination"
    :page-slots="5"
    @click="setQuery"
  />
</template>

<style scoped lang="sass">
.pagination
  margin-top: 40px
  display: flex
  justify-content: center
</style>
