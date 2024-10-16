'use client';

import S from './Auth.module.scss';
import Input from '../@shared/input/Input';
import Button from '../button/Button';
import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import { VALID_OPTIONS } from '@/constants/validOption';
import { FieldValues } from 'react-hook-form';
import { login } from '@/fetches/login';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useToggle } from '@/hooks/useToggle';
import { useState } from 'react';
import ConfirmModal from '../modal/ConfirmModal';
import { useUserStore } from '@/stores/useUserStore';
import { setCookie } from 'cookies-next';

const loginConfig: ValidationConfig = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: VALID_OPTIONS.emailPattern,
  },
  password: {
    required: '비밀번호를 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
  },
};

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useUserStore(state => state.action);
  const { toggleValue, toggleDispatch } = useToggle();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors } = useValidForm({ validationConfig: loginConfig });

  const handleSignupFormSubmit = async (formData: FieldValues) => {
    if (formData.email && formData.password) {
      const { email, password } = formData;
      try {
        const { user, accessToken, refreshToken } = await login({ email, password });
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);

        const { nickname, profileImageUrl } = user;
        setUser({ email, nickname, profileImageUrl });

        router.replace('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data.message;
          setErrorMessage(message);
          toggleDispatch({ type: 'on' });
        }
      }
    }
  };

  return (
    <form className={S.authForm} onSubmit={handleSubmit(handleSignupFormSubmit)}>
      <Input
        label="이메일"
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        htmlFor="email"
        message={errors.email?.message}
        register={register.email}
      />

      <Input
        label="비밀번호"
        placeholder="8자 이상 입력해 주세요"
        error={errors.password}
        htmlFor="password"
        message={errors.password?.message}
        register={register.password}
        type="password"
      />

      <Button buttonColor="gray" borderRadius="radius6" textSize="md" padding="padding8">
        로그인 하기
      </Button>
      <ConfirmModal
        isOpen={toggleValue}
        onConfirm={() => toggleDispatch({ type: 'off' })}
        onClose={() => toggleDispatch({ type: 'off' })}
        message={errorMessage}
      />
    </form>
  );
}
