import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import Input from '../@shared/input/Input';
import Button from '../@shared/button/Button';
import S from './UserInfoForm.module.scss';
import { useValidForm } from '@/hooks/useValidForm';
import { VALID_OPTIONS } from '@/constants/validOption';
import { useUserQuery } from '@/queries/useUserQuery';
import { patchUserInfo } from '@/fetches/patchUserInfo';
import ConfirmModal from '../@shared/modal/ConfirmModal';
import { useRouter } from 'next/navigation';

const config = {
  nickname: {
    required: '닉네임을 입력해주세요.',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    pattern: VALID_OPTIONS.passwordPattern,
  },
  passwordConfirmation: {
    required: '비밀번호를 재입력해주세요.',
    validate: {
      matched: (value: string, formValues: Record<string, any>) =>
        value === formValues.password || '비밀번호가 일치하지 않습니다.',
    },
  },
};

const UserInfoForm: React.FC = () => {
  const { errors, register, handleSubmit, setValue } = useValidForm({ validationConfig: config });
  const { data: userInfo } = useUserQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setValue('nickname', userInfo.nickname);
      setValue('email', userInfo.email);
    }
  }, [userInfo, setValue]);

  const handleFormSubmit = async (formData: any) => {
    try {
      await patchUserInfo({
        nickname: formData.nickname,
      });
      setModalOpen(true);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    router.push('/mypage');
  };

  return (
    <div className={S.userInfoForm}>
      <Title order={2} className={S.title}>
        내 정보
      </Title>

      <form onSubmit={handleSubmit(handleFormSubmit)} className={S.form}>
        <div className={S.buttonWrapper}>
          <Button
            buttonColor="nomadBlack"
            textSize="lg"
            borderRadius="radius6"
            padding="padding14"
            className={S.submitButton}
            type="submit"
          >
            저장하기
          </Button>
        </div>

        <Input
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          htmlFor="nickname"
          error={errors.nickname}
          register={register.nickname}
          message={errors.nickname?.message}
          className={S.input}
        />

        <Input
          label="이메일"
          placeholder="이메일을 입력하세요"
          htmlFor="email"
          error={errors.email}
          {...register.email}
          message={errors.email?.message}
          type="email"
          disabled
          value={userInfo?.email || ''}
          className={S.input}
        />

        <Input
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력하세요"
          htmlFor="password"
          error={errors.password}
          register={register.password}
          message={errors.password?.message}
          type="password"
          className={S.input}
        />

        <Input
          label="새 비밀번호 재입력"
          placeholder="비밀번호를 재입력하세요"
          htmlFor="passwordConfirmation"
          error={errors.passwordConfirmation}
          register={register.passwordConfirmation}
          message={errors.passwordConfirmation?.message}
          type="password"
          className={S.input}
        />
      </form>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        message="변경되었습니다."
      />
    </div>
  );
};

export default UserInfoForm;
