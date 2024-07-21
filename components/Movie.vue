<script setup lang="ts">
import type { IMovieProps } from "@/types/movie";
const props = defineProps<IMovieProps>();
const listMovies = computed(() => props.movies);
</script>
<template>
  <div class="index__movie">
    <nuxt-link :to="`/movie/${listMovies.link}`" class="index__movie-a">
      <div class="index__movie-img">
        <div class="index__movie-raiting">
          <Icon name="solar:stars-broken" />
          <span>{{ listMovies.rating }}</span>
        </div>
        <NuxtImg :src="listMovies.poster" loading="lazy" format="wepb" />
      </div>
      <div class="index__movie-desc">
        <strong> {{ listMovies.title }}</strong>
        <span>{{ listMovies.issue_date }}</span>
        <span>{{ listMovies.genre }}</span>
      </div>
    </nuxt-link>
  </div>
</template>
