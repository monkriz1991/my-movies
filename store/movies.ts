import { defineStore } from "pinia";
import { reactive } from "vue";
import type { IMovie } from "@/types/movie";

interface State {
  movies: IMovie[];
}

interface IMovieStatus {
  movie: "initial" | "pending" | "success" | "error";
}

const status = reactive<IMovieStatus>({
  movie: "initial",
});

export const useMoviesStore = defineStore("movies", {
  state: (): State => ({
    movies: [],
  }),
  getters: {
    getMovie: (state) => state.movies,
    getMovieById: (state) => (id: number) =>
      state.movies.find((movie) => movie.id === id),
  },
  actions: {
    async getIdMovies(link: string) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки
        const movie = this.movies.find((movie) => movie.link === link) || null;
        return movie;
      } catch (error) {
        console.error("Ошибка получения фильма:", error);
        return null;
      }
    },
    async loadMovies() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки
        // Пример данных
        this.movies = this.movies;
      } catch (error) {
        console.error("Ошибка загрузки фильмов:", error);
      }
    },
    async addMovie(item: Omit<IMovie, "id" | "poster">) {
      try {
        status.movie = "pending";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const nextId =
          this.movies.length > 0
            ? Math.max(...this.movies.map((movie) => movie.id)) + 1
            : 1;

        const poster = this.extractPosterFromLink(item.movie_id);

        const newMovie: IMovie = { ...item, id: nextId, poster };

        this.movies.push(newMovie);
        status.movie = "success";
        return { status: "success", message: "Фильм успешно добавлен." };
      } catch (error) {
        status.movie = "error";
        return { status: "error", message: "Ошибка записи фильма." };
      }
    },
    async updateMovie(id: number, updatedItem: Omit<IMovie, "id" | "poster">) {
      try {
        status.movie = "pending";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const index = this.movies.findIndex((movie) => movie.id === id);
        if (index === -1) {
          status.movie = "error";
          return { status: "error", message: "Фильм не найден." };
        }

        const poster = this.extractPosterFromLink(updatedItem.movie_id);
        this.movies[index] = { ...updatedItem, id, poster };

        status.movie = "success";
        return { status: "success", message: "Фильм успешно обновлен." };
      } catch (error) {
        status.movie = "error";
        return { status: "error", message: "Ошибка обновления фильма." };
      }
    },
    dellMovie(id: number) {
      this.movies = this.movies.filter((item) => item.id !== id);
    },
    extractPosterFromLink(movie_id: string): string {
      const videoIdMatch = movie_id;
      return videoIdMatch
        ? `https://img.youtube.com/vi/${videoIdMatch}/hqdefault.jpg`
        : `https://img.youtube.com/vi/TJ6lSSj81LE/hqdefault.jpg`;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
