import classNames from 'classnames';
import S from './Input.module.scss';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

interface ValidInputProps {
  label?: string;
  htmlFor?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  register?: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export default function Input({
  label,
  htmlFor,
  error,
  message,
  register,
  type = 'text',
  placeholder = '',
}: ValidInputProps) {
  return (
    <div className={S.inputWrapper}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <input
        id={htmlFor}
        type={type}
        className={classNames({ [S.error]: error })}
        placeholder={placeholder}
        {...register}
      />
      {message && <p className={S.message}>{message.toString()}</p>}
    </div>
  );
}
