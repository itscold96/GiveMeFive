import classNames from 'classnames';
import S from './Input.module.scss';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

interface ValidInputProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  register?: UseFormRegisterReturn;
  className?: string;
}

export default function Input({ htmlFor, label, error, message, register, className, ...inputProps }: ValidInputProps) {
  return (
    <div className={classNames(S.inputWrapper, className)}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <input id={htmlFor} className={classNames({ [S.error]: error })} {...register} {...inputProps} />
      {message && <p className={S.message}>{message.toString()}</p>}
    </div>
  );
}
