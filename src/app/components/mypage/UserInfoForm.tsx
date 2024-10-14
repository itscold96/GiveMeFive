import React from 'react';
import { Button, TextInput, Title } from '@mantine/core';
import styles from './UserInfoForm.module.scss';

const UserInfoForm: React.FC = () => {
  return (
    <div className={styles['user-info-form']}>
      <Title order={2}>내 정보</Title>

      <form className={styles['form']}>
        <TextInput label="닉네임" placeholder="닉네임을 입력하세요" required className={styles['input']} />

        <TextInput label="이메일" placeholder="이메일을 입력하세요" required type="email" className={styles['input']} />

        <TextInput
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          required
          type="password"
          className={styles['input']}
        />

        <TextInput
          label="비밀번호 재입력"
          placeholder="비밀번호를 재입력하세요"
          required
          type="password"
          className={styles['input']}
        />

        <Button type="submit" className={styles['submit-button']}>
          저장하기
        </Button>
      </form>
    </div>
  );
};

export default UserInfoForm;
