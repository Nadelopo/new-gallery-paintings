<script setup lang="ts">
import type { SVGAttributes } from 'vue';
import dark from '@/assets/icons/dark_icon.svg';
import light from '@/assets/icons/light_icon.svg';
import logo from '@/assets/icons/logo_small.svg';
// eslint-disable-next-line
import logo_big from '@/assets/icons/logo.svg';
import vector from '@/assets/icons/vector.svg';
import search from '@/assets/icons/search_icon.svg';
import close from '@/assets/icons/close_icon.svg';
import expand from '@/assets/icons/expand_icon.svg';
import filter from '@/assets/icons/filter_icon.svg';
import arrow from '@/assets/icons/arrow_icon.svg';
// eslint-disable-next-line
import close_big from '@/assets/icons/close_big.svg';
// eslint-disable-next-line
import plus_big from '@/assets/icons/plus_icon.svg';
import plus from '@/assets/icons/plus_small.svg';
import minus from '@/assets/icons/minus.svg';
// eslint-disable-next-line
import minus_big from '@/assets/icons/minus_big.svg';

interface Props extends /* @vue-ignore */ SVGAttributes {
  icon:
    | 'dark'
    | 'light'
    | 'logo'
    | 'logo_big'
    | 'vector'
    | 'search'
    | 'close'
    | 'expand'
    | 'filter'
    | 'arrow'
    | 'close_big'
    | 'plus_big'
    | 'plus'
    | 'minus'
    | 'minus_big';
}
defineProps<Props>();

const icons = {
  dark,
  light,
  logo,
  // eslint-disable-next-line
  logo_big,
  vector,
  search,
  close,
  expand,
  filter,
  arrow,
  // eslint-disable-next-line
  close_big,
  // eslint-disable-next-line
  plus_big,
  plus,
  minus,
  // eslint-disable-next-line
  minus_big,
};
</script>

<template>
  <component :is="icons[icon]" />
</template>
