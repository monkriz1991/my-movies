<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import type { IMovie } from "@/types/movie";
import { useMoviesStore } from "@/store/movies";
import formFields from "@/utils/formInput";
import schema from "@/utils/schema";

const props = defineProps<{
  idItem: number | null;
}>();
const emit = defineEmits(["update:idItem"]);

const { $initializeNotifications } = useNuxtApp();
const movieStore = useMoviesStore();

const initialFormState: IMovie = {
  id: 0,
  title: "",
  issue_date: "",
  genre: "",
  rating: 0,
  link: "",
  poster: "",
  movie_id: "",
  description: "",
};

const form = ref<IMovie>({ ...initialFormState });
const notificationVisible = ref(false);
const notificationMessage = ref("");
const isEditing = ref<boolean>(false);

const resetForm = () => {
  form.value = { ...initialFormState };
};

const loadMovie = async (id: number) => {
  const movie = movieStore.getMovieById(id);
  if (movie) {
    form.value = { ...movie };
  }
};

const updateMovie = async (id: number, updatedItem: Omit<IMovie, "id">) => {
  const response = await movieStore.updateMovie(id, updatedItem);
  notificationMessage.value = response.message;
  notificationVisible.value = true;
  setTimeout(() => {
    notificationVisible.value = false;
  }, 15000);
};

const submitForm = async (value: any) => {
  value["description"] = form.value.description;

  if (props.idItem) {
    await updateMovie(props.idItem, value);
  } else {
    const response = await movieStore.addMovie(value);
    notificationMessage.value = response.message;
    notificationVisible.value = true;
    setTimeout(() => {
      notificationVisible.value = false;
    }, 15000);
  }
  emit("update:idItem", null);
  resetForm();
  isEditing.value = false;
};

const cancelEdit = () => {
  emit("update:idItem", null);
  resetForm();
  isEditing.value = false;
};

onMounted(() => {
  $initializeNotifications();
  if (props.idItem) {
    loadMovie(props.idItem);
    isEditing.value = true;
  }
});

watch(
  () => props.idItem,
  (newId) => {
    if (newId) {
      loadMovie(newId);
      isEditing.value = true;
    } else {
      resetForm();
      isEditing.value = false;
    }
  }
);

const initialValues = computed(() => {
  return { ...form.value };
});

const formKey = ref(0);
watch(
  () => form.value,
  () => {
    formKey.value++;
  }
);
</script>

<template>
  <div class="cabinet__form">
    <div v-if="notificationVisible" class="notification is-success is-light">
      <button class="delete" @click="notificationVisible = false"></button>
      {{ notificationMessage }}
    </div>
    <h4 class="cabinet__form-h1">
      {{ isEditing ? "Редактировать фильм" : "Добавить новый фильм" }}
    </h4>
    <button
      class="button is-warning is-light cabinet__form-b--edit"
      @click="cancelEdit"
      v-if="isEditing"
    >
      Отменить изменения
    </button>
    <VeeForm
      :key="formKey"
      :initial-values="initialValues"
      :validation-schema="schema"
      @submit="submitForm"
    >
      <div class="field" v-for="field in formFields" :key="field.id">
        <label class="label" :for="field.id">{{ field.label }}</label>
        <div class="control" v-if="field.type === 'textarea'">
          <textarea class="textarea" v-model="form[field.model]"></textarea>
        </div>
        <div v-else>
          <VeeField :name="field.id" v-slot="{ handleChange, handleBlur }">
            <input
              class="input"
              @input="handleChange"
              @blur="handleBlur"
              :type="field.type"
              v-model="form[field.model]"
              :required="field.required"
              :number="field.type === 'number'"
              :min="field.min"
              :max="field.max"
            />
            <VeeErrorMessage :name="field.id" as="div" class="help is-danger" />
          </VeeField>
        </div>
      </div>
      <button class="button is-primary" type="submit">
        {{ isEditing ? "Сохранить изменения" : "Создать" }}
      </button>
    </VeeForm>
  </div>
</template>

<style scoped></style>
