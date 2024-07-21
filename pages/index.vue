<script setup lang="ts">
import { useMoviesStore } from "@/store/movies";

const movieStore = useMoviesStore();
const { movies } = storeToRefs(movieStore);
</script>
<template>
  <div class="content">
    <h1>Movies</h1>

    <h5 class="mb-6">Ваша личная коллекцию youtube видео.</h5>
    <div class="columns is-multiline">
      <ClientOnly>
        <div class="column is-4" v-for="item in movies" :key="item.id">
          <Movie :movies="item" />
        </div>
        <div v-if="movies.length == 0" class="column">
          <nuxt-link to="/cabinet">
            <button class="button is-primary">
              <span class="icon">
                <Icon name="solar:file-smile-broken" />
              </span>
              <span>Создать коллекцию</span>
            </button>
          </nuxt-link>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
