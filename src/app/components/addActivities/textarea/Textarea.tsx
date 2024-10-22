import classNames from 'classnames';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import S from './Textarea.module.scss';

interface ValidInputProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
}

export default function Textarea({ error, message, register, placeholder = '', className }: ValidInputProps) {
  return (
    <div className={classNames(S.textareaWrapper, className)}>
      <textarea className={classNames({ [S.error]: error })} placeholder={placeholder} {...register} />
      {message && <p className={S.message}>{message.toString()}</p>}
    </div>
  );
}
