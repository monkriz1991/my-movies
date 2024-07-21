import type { IMovie } from "@/types/movie";
import { object, string, number } from "yup";
import { configure } from "vee-validate";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const schema = object({
  title: string()
    .min(1, "Введите хотя бы один символ")
    .required("Введите название фильма"),
  issue_date: string()
    .required("Введите дату выпуска")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Дата выпуска должна быть в формате ГГГГ-ММ-ДД"
    ),
  genre: string()
    .min(1, "Введите хотя бы один символ")
    .required("Введите жанр"),
  rating: number()
    .min(1, "Рейтинг должен быть не менее 1")
    .max(10, "Рейтинг должен быть не более 10")
    .required("Введите рейтинг"),
  link: string().required("Введите ссылку"),
});

export default schema;
