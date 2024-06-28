import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Author = {
  id: number;
  name: string;
};

export type Location = {
  id: number;
  location: string;
};

export const useDataStore = defineStore('data', () => {
  const authors = ref<Author[]>([]);
  const locations = ref<Location[]>([]);
  const authorId = ref<number | null>(null);
  const locationId = ref<number | null>(null);
  const search = ref('');
  const totalPages = ref(0);
  const page = ref(1);
  const createdFrom = ref<number | null>(null);
  const createdTo = ref<number | null>(null);

  return {
    authors,
    locations,
    search,
    totalPages,
    page,
    authorId,
    locationId,
    createdFrom,
    createdTo,
  };
});
