import * as yup from 'yup';

export const schemaSignUp = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Допускается не менее 3 символов')
    .matches(/^[a-zA-Z]*$/, 'Имя должно содержать только латинские символы')
    .max(20, 'Допускается не более 20 символов')
    .required('Это поле обязательно'),
  email: yup
    .string()
    .lowercase()
    .email('Введите корректный email адрес, пример: qwerty@qwerty.ru')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Введите корректный email адрес, пример: qwerty@qwerty.ru')
    .required('Это поле обязательно'),
  password: yup
    .string()
    .min(6, 'Допускается не менее 6 символов')
    .max(40, 'Допускается не более 40 символов')
    .required('Это поле обязательно'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
  agreement: yup.boolean().oneOf([true], 'Вы должны согласиться с обработкой персональных данных'),
});

export const schemaSignIn = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email('Введите корректный email адрес, пример: qwerty@qwerty.ru')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Введите корректный email адрес, пример: qwerty@qwerty.ru')
    .required('Это поле обязательно'),
  password: yup
    .string()
    .min(6, 'Допускается не менее 6 символов')
    .max(40, 'Допускается не более 40 символов')
    .required('Это поле обязательно'),
});

export const schemaEditProfile = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Допускается не менее 3 символов')
    .matches(/^[a-zA-Z]*$/, 'Имя должно содержать только латинские символы')
    .max(20, 'Допускается не более 20 символов')
    .optional()
    .nullable()
    .notRequired(),
  email: yup
    .string()
    .lowercase()
    .email('Введите корректный email адрес, пример: qwerty@qwerty.ru')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Введите корректный email адрес, пример: qwerty@qwerty.ru')
    .optional(),
  image: yup.string().url('Введите корректный URL, пример: https://qwerty.qw/qwerty.png').optional(),
  password: yup
    .string()
    .min(6, 'Допускается не менее 6 символов')
    .max(40, 'Допускается не более 40 символов')
    .optional(),
});

export const schemaCreateNewArticle = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Допускается не менее 3 символов')
    .max(100, 'Допускается не более 100 символов')
    .trim()
    .required('Это поле обязательно'),
  description: yup.string().trim().min(3, 'Допускается не менее 3 символов').required('Это поле обязательно'),
  body: yup
    .string()
    .min(3, 'Допускается не менее 3 символов')
    .max(10000, 'Допускается не более 10000 символов')
    .trim()
    .required('Это поле обязательно'),
  tags: yup
    .array()
    /* .of(yup.string().min(3, 'Не менее 3 символов').max(15, 'Не более 15 символов').optional()) */
    .max(10, 'Допускается не более 10 тегов')
    .compact((value) => value === false)
    /* .of(yup.string().min(3, 'Не менее 3 символов').max(15, 'Не более 15 символов').optional()) */
    .optional(),
});
