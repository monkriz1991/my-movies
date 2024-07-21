<script setup lang="ts">
import { useMoviesStore } from "@/store/movies";
const movieStore = useMoviesStore();

const { getMovie } = storeToRefs(movieStore);
const editFormId = ref<number | null>(null);
const editForm = (item: any) => {
  editFormId.value = item;
};
const cancelEdit = () => {
  editFormId.value = null;
};
</script>
<template>
  <div class="content">
    <h1>Cabinet</h1>
    <div class="columns">
      <div class="column is-7">
        <ClientOnly>
          <div v-for="item in getMovie" :key="item.id">
            <CabinetUnit :movies="item" @editForm="editForm" />
          </div>
        </ClientOnly>
      </div>
      <div class="column is-5">
        <CabinetForm :idItem="editFormId" @update:idItem="cancelEdit" />
      </div>
    </div>
  </div>
</template>
