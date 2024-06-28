<script setup lang="ts">
import { VIcon } from '.';

const props = defineProps<{
  title: string;
  year: string;
  author: string;
  location: string;
  url: string;
}>();

const imageUrl = import.meta.env.VITE_API + props.url;
</script>

<template>
  <div class="v__card">
    <img
      :src="imageUrl"
      alt=""
    />
    <div class="info">
      <div class="v__wrapper">
        <div class="artist__info">
          <h1>{{ author }}</h1>
          <div class="caption">{{ location }}</div>
        </div>
        <div class="artwork__info">
          <h1>{{ title }}</h1>
          <div class="caption">{{ year }}</div>
        </div>
      </div>
      <button type="button">
        <v-icon
          icon="vector"
          fill="#fff"
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/breakpoints.sass' as *

.v__card
  width: 392px
  height: 260px
  overflow: hidden
  position: relative
  &:hover
    img
      scale: 1.05
    .artist__info
      opacity: 1
      left: 20px
      @media (width< $md)
        left: 12px
    .artwork__info
      opacity: 0
      transform: translateY(60px)
  img
    position: absolute
    // top: -80px
    transition: .4s
    width: 100%
  @media (width < $md)
    width: 352px
    height: 220px
  @media (width < $sm)
    width: 280px
    height: 185px

.info
  height: 82px
  position: absolute
  bottom: 0
  display: flex
  @media (width < $md)
    height: 66px
  @media (width < $sm)
    height: 45px
  button
    width: 24px
    border: none
    background: var(--accent)
    padding: 0 6px 0 2px
    display: none
    outline: none
    @media (width < $md)
      display: block

.v__wrapper
  position: relative
  width: 100%
  height: 100%
  padding: 20px 0 20px 20px
  background: var(--primary)
  width: 300px
  &::before
    content: ''
    position: absolute
    border: 1px solid var(--accent)
    width: 0
    left: 0
    height: 42px
  @media (width< $md)
    padding: 12px 0 12px 12px
  @media (width < $sm)
    width: 236px
    padding: 8px 0 8px 12px
  h1
    font-family: Cormorant SC
    color: var(--text-primary)
    font-size: 16px
    font-weight: 500
    text-transform: uppercase
    margin-bottom: 8px
    @media (width< $sm)
      font-size: 12px
      margin-bottom: 4px
  .caption
    font-family: Inter
    font-weight: 700
    font-size: 12px
    text-transform: uppercase
    color: var(--accent)
    @media (width< $sm)
      font-size: 8px

.artist__info
  position: absolute
  left: -280px
  opacity: 0
  transition: .4s

.artwork__info
  transition: .4s
</style>
