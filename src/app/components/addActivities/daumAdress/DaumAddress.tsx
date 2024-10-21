'use client';
import { useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import Input from '../../@shared/input/Input';

interface DaumAddressProps {
  errors: any;
  register: any;
  setValue: any;
}
const DaumAddress = ({ errors, register, setValue }: DaumAddressProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [infoAddress, setInfoAddress] = useState('');

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setInfoAddress(fullAddress);
    setValue('address', fullAddress);
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div>
          <button type="button" onClick={() => setIsVisible(false)}>
            닫기
          </button>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
      <Input
        label="주소"
        htmlFor="address"
        placeholder="주소를 검색해주세요"
        onClick={() => setIsVisible(true)}
        error={errors.address}
        register={register.address}
        message={errors.address?.message}
        value={infoAddress}
      />
    </div>
  );
};

export default DaumAddress;
