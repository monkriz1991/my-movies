import type { IMovie } from "@/types/movie";
// Типы допустимых ключей для объекта формы
type FormFieldKey = keyof IMovie;
// Массив объектов, описывающих поля формы

const formFields: {
  id: string;
  label: string;
  type: string;
  model: FormFieldKey;
  required: boolean;
  min?: number;
  max?: number;
}[] = [
  {
    id: "title",
    label: "Название:",
    type: "text",
    model: "title",
    required: true,
  },
  {
    id: "issue_date",
    label: "Дата выпуска:",
    type: "date",
    model: "issue_date",
    required: true,
  },
  {
    id: "genre",
    label: "Жанр:",
    type: "text",
    model: "genre",
    required: true,
  },
  {
    id: "rating",
    label: "Рейтинг:",
    type: "number",
    model: "rating",
    required: true,
    min: 1,
    max: 10,
  },
  {
    id: "movie_id",
    label: "ID видео youtube (0q_BrgesfF4):",
    type: "text",
    model: "movie_id",
    required: true,
  },
  {
    id: "link",
    label: "URL видео стр.:",
    type: "text",
    model: "link",
    required: true,
  },
  {
    id: "description",
    label: "Описание:",
    type: "textarea",
    model: "description",
    required: true,
  },
];

export default formFields;
