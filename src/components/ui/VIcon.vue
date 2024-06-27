<script setup lang="ts">
import type { SVGAttributes } from 'vue';
import dark from '@/assets/icons/dark_icon.svg';
import light from '@/assets/icons/light_icon.svg';
import logo from '@/assets/icons/logo.svg';
import vector from '@/assets/icons/vector.svg';
import search from '@/assets/icons/search_icon.svg';
import close from '@/assets/icons/close_icon.svg';
import expand from '@/assets/icons/expand_icon.svg';
import filter from '@/assets/icons/filter_icon.svg';
import arrow from '@/assets/icons/arrow_icon.svg';

interface Props extends /* @vue-ignore */ SVGAttributes {
  icon: 'dark' | 'light' | 'logo' | 'vector' | 'search' | 'close' | 'expand' | 'filter' | 'arrow';
}
defineProps<Props>();

const icons = {
  dark,
  light,
  logo,
  vector,
  search,
  close,
  expand,
  filter,
  arrow,
};
</script>

<template>
  <component :is="icons[icon]" />
</template>
