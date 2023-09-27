/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import { Alert } from 'antd';
import React from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';


const ErrorAlert: React.FC = () => {
  const { errors } = useAppSelector((state) => state.blogApp);
  let message = '';
  let description = '';
  switch (errors?.status) {
  case 500:
    message = `Ошибка сервера: ${errors?.errors ? errors?.errors[0].message : null}`;
    description = `Попробуйте перезагрузить страницу позже. ${errors?.errors ? errors?.errors[1].key && errors?.errors[1].message : null}`;
    break;
  case 422:
    message = `Ошибка авторизации: ${errors?.errors ? errors?.errors[0].message : null}`;
    description = `Проверьте введенные данные. ${errors?.errors ? (`${errors?.errors[1].key } ${ errors?.errors[1].message}`) : null}`;
    break;
  case undefined:
    message = `Ошибка соединения: ${errors?.errors ? errors?.errors[0].message : null}`;
    description = `Попробуйте перезагрузить страницу позже.. ${errors?.errors ? (`${errors?.errors[1].key } ${ errors?.errors[1].message}`) : null}`;
    break;
  default:
    message = `Что-то пошло не так: ${errors?.errors ? errors?.errors[0].message : null}`;
    description = `Попробуйте перезагрузить страницу позже.. ${errors?.errors ? (`${errors?.errors[1].key } ${ errors?.errors[1].message}`) : null}`;
    break;
  }
  return <Alert message={message} description={`${description}`} type="error" showIcon style={{ margin: '1em', width: '50%' }} closable />;
};

export default ErrorAlert;
