<script setup lang="ts">
import type { IMovie } from "@/types/movie";
import { useMoviesStore } from "@/store/movies";
import { useRouter, useRoute } from "vue-router";
import { computed, ref, onMounted, watch } from "vue";

const movieStore = useMoviesStore();
const router = useRouter();
const route = useRoute();

const linkParams = computed(() => route.params.id);
const dataMovie = ref<IMovie | null>(null);
const linkVideo = ref<string>("");
const titleVideo = ref<string>("");
const dateVideo = ref<number | any>("");
const ganreVideo = ref<number | any>("");
const descriptionVideo = ref<string>("");
const raitingVideo = ref<number>(0);
const centerDialogVisible = ref<boolean>(false);

const loadMovieData = async () => {
  dataMovie.value = await movieStore.getIdMovies(String(linkParams.value));
  if (dataMovie.value != null) {
    centerDialogVisible.value = true;
    linkVideo.value = dataMovie.value.movie_id;
    titleVideo.value = dataMovie.value.title;
    descriptionVideo.value = dataMovie.value.description;
    dateVideo.value = dataMovie.value.issue_date;
    ganreVideo.value = dataMovie.value.genre;
    raitingVideo.value = dataMovie.value.rating;
    if (linkVideo.value == "") {
      linkVideo.value = "TJ6lSSj81LE";
    }
  }
};
onMounted(() => {
  loadMovieData();
});
watch(linkParams, () => {
  loadMovieData();
});
</script>
<template>
  <div>
    <div class="back" @click="$router.back()">
      <Icon name="solar:round-alt-arrow-left-broken" />
      <strong>Назад</strong>
    </div>
    <div class="content">
      <div class="movie__page">
        <h1 class="movie__page-h1">{{ titleVideo }}</h1>
        <div class="movie__page-info">
          <div class="movie__page-info--date">
            <strong>Дата выхода:</strong>
            <span>{{ dateVideo }}</span>
          </div>
          <div class="movie__page-info--ganre">
            <strong>Жанр:</strong>
            <span>{{ ganreVideo }}</span>
          </div>
          <div class="movie__page-info--raiting">
            <Icon name="solar:stars-broken" />
            <span>{{ raitingVideo }}</span>
          </div>
        </div>
        <div class="movie__page-video">
          <ClientOnly>
            <ScriptYouTubePlayer
              v-if="centerDialogVisible == true"
              trigger="visible"
              above-the-fold
              class="movie__page-video--plyr"
              :video-id="linkVideo"
            >
            </ScriptYouTubePlayer>
          </ClientOnly>
        </div>
        <div class="movie__page-desc">
          <div v-html="descriptionVideo"></div>
        </div>
      </div>
    </div>
  </div>
</template>
