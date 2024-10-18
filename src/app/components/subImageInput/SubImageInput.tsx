import Image from 'next/image';
import S from './SubImageInput.module.scss';
import plusIcon from '@/images/plus-icon.svg';
import deleteButton from '@/images/delete-button.svg';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
interface BannerImageInputProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  setValue?: any;
}
export default function SubImageInput({ error, message, setValue }: BannerImageInputProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imagePreviewFiles, setImagePreviewFiles] = useState<string[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && imagePreviews.length < 4) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      const fileNames = files.map(file => file.name);
      setImagePreviewFiles(prev => [...prev, ...fileNames]);
    }
  };
  const onRemoveImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImagePreviewFiles(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setValue('subImageUrls', imagePreviewFiles);
  }, [imagePreviewFiles]);

  return (
    <div className={S.container}>
      <div className={S.labelName}>소개 이미지</div>
      <div className={S.box}>
        <div className={S.inputBox}>
          <label htmlFor="addSubImage" className={S.labelWrapper}>
            <div className={S.addImageButton}>
              <Image src={plusIcon} alt="이미지 등록 버튼" width={29.5} height={29.5} />
              <div>이미지 등록</div>
            </div>
          </label>
          <input name="bannerImageUrl" type="file" accept="image/*" id="addSubImage" onChange={handleFileChange} />
        </div>
        {imagePreviews.length > 0 && (
          <div className={S.imagePreviewContainer}>
            {imagePreviews.map((preview, index) => (
              <div key={`${preview}-${index}`} className={S.imagePreviewWrapper}>
                <Image
                  src={preview}
                  alt={`미리보기 이미지 ${index + 1}`}
                  width={180}
                  height={180}
                  className={S.imagePreview}
                />
                <Image
                  src={deleteButton}
                  alt="미리보기 이미지 삭제 버튼"
                  width={24}
                  height={24}
                  className={S.deleteButton}
                  onClick={() => onRemoveImage(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className={S.message}>{message?.toString()}</p>}
      <div className={S.miniText}>*이미지는 최대 4개까지 등록 가능합니다.</div>
    </div>
  );
}
