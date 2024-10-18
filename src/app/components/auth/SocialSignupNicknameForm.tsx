import S from './SocialSignupNicknameForm.module.scss';
import Input from '../@shared/input/Input';
import { useValidForm, ValidationConfig } from '@/hooks/useValidForm';
import { VALID_OPTIONS } from '@/constants/validOption';
import { FieldValues } from 'react-hook-form';
import Button from '../@shared/button/Button';

const nicknameConfig: ValidationConfig = {
  nickname: {
    required: '닉네임을 입력해주세요',
    minLength: VALID_OPTIONS.minLength2,
    maxLength: VALID_OPTIONS.maxLength10,
  },
};

interface SocialSignupNicknameFormProps {
  onSubmit: (nickname: string) => void;
}

export default function SocialSignupNicknameForm({ onSubmit }: SocialSignupNicknameFormProps) {
  const { register, errors, handleSubmit } = useValidForm({ validationConfig: nicknameConfig });

  const handleNicknameFormSubmit = (formData: FieldValues) => {
    if (formData.nickname) {
      const { nickname } = formData;
      onSubmit(nickname);
    }
  };

  return (
    <div className={S.nicknameFormContainer}>
      <form className={S.nicknameForm} onSubmit={handleSubmit(handleNicknameFormSubmit)}>
        <Input
          htmlFor="nickname"
          error={errors.nickname}
          register={register.nickname}
          label="닉네임"
          message={errors.nickname?.message}
        />
        <div className={S.buttonWrapper}>
          <Button buttonColor="gray" borderRadius="radius6" textSize="lg" padding="padding8">
            가입하기
          </Button>
        </div>
      </form>
    </div>
  );
}
