import Image from 'next/image';
import S from './BannerImageInput.module.scss';
import plusIcon from '@/images/plus-icon.svg';
import deleteButton from '@/images/delete-button.svg';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { useState } from 'react';
interface BannerImageInputProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  setValue?: any;
}
export default function BannerImageInput({ error, message, setValue }: BannerImageInputProps) {
  const [imagePreview, setImagePreview] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('bannerImageUrl', file.name);
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
    }
  };

  const onRemoveBannerImage = () => {
    setValue('bannerImageUrl', '');
    setImagePreview('');
  };

  return (
    <div className={S.container}>
      <div className={S.labelName}>배너 이미지</div>
      <div className={S.box}>
        <div className={S.inputBox}>
          <label htmlFor="addImage" className={S.labelWrapper}>
            <div className={S.addImageButton}>
              <Image src={plusIcon} alt="이미지 등록 버튼" width={29.5} height={29.5} />
              <div>이미지 등록</div>
            </div>
          </label>
          <input name={imagePreview} type="file" accept="image/*" id="addImage" onChange={handleFileChange} />
        </div>
        {imagePreview && (
          <div className={S.imagePreviewContainer}>
            <div className={S.imagePreviewWrapper}>
              <Image
                src={imagePreview}
                alt="배너 미리보기 이미지"
                width={180}
                height={180}
                className={S.imagePreview}
              />
              <Image
                src={deleteButton}
                alt="배너 미리보기 이미지 삭제 버튼"
                width={24}
                height={24}
                className={S.deleteButton}
                onClick={onRemoveBannerImage}
              />
            </div>
          </div>
        )}
      </div>
      {error && <p className={S.message}>{message?.toString()}</p>}
    </div>
  );
}
