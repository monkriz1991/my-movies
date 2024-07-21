<script setup lang="ts">
import type { IMovieProps } from "@/types/movie";
import { useMoviesStore } from "@/store/movies";
const movieStore = useMoviesStore();
const props = defineProps<IMovieProps>();

const listMovies = computed(() => props.movies);
const emit = defineEmits(["editForm"]);

const editItem = (id: number) => {
  emit("editForm", id);
};

const dellItem = (id: number) => {
  if (confirm("Вы уверены, что хотите удалить фильм?")) {
    movieStore.dellMovie(id);
  }
};
</script>
<template>
  <div class="cabinet__movie">
    <div class="cabinet__movie-title">
      <span>{{ listMovies.title }}</span>
    </div>
    <div class="cabinet__movie-b_group">
      <div class="field is-grouped">
        <p class="control">
          <button
            class="button is-white is-small"
            @click="editItem(listMovies.id)"
          >
            Редактировать
          </button>
        </p>
        <p class="control">
          <button
            class="button is-danger is-small"
            @click="dellItem(listMovies.id)"
          >
            Удалить
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
