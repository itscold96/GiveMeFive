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
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Input({
  label,
  htmlFor,
  error,
  message,
  register,
  type = 'text',
  placeholder = '',
  className,
  onClick,
  value,
}: ValidInputProps) {
  return (
    <div className={classNames(S.inputWrapper, className)}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <input
        id={htmlFor}
        type={type}
        className={classNames({ [S.error]: error })}
        placeholder={placeholder}
        {...register}
        onClick={onClick}
        value={value}
      />
      {message && <p className={S.message}>{message.toString()}</p>}
    </div>
  );
}
