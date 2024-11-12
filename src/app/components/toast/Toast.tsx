import { ReactNode, useEffect } from 'react';
import S from './Toast.module.scss';
import Image from 'next/image';
import iconSuccess from '@/images/icons/icon-success.svg';
import iconWarn from '@/images/icons/icon-warn.svg';
import iconError from '@/images/icons/icon-error.svg';
import { useToastStore } from '@/stores/useToastStore';
import { Toast as ToastProps, ToastTypes } from '@/types/toast';
import classNames from 'classnames';

const DELAY = 2 * 1000; // 토스트 삭제 딜레이 2초

export default function Toast({ id, type, message }: ToastProps) {
  const { removeToast } = useToastStore(state => state.action);

  useEffect(() => {
    const timerId = setTimeout(() => {
      removeToast(id);
    }, DELAY);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      className={classNames(S.toast, {
        [S.success]: type === 'success',
        [S.warn]: type === 'warn',
        [S.error]: type === 'error',
      })}
    >
      <div className={S.content}>
        {ToastIcon[type]}
        <p className={S.message}>{message}</p>
      </div>
    </div>
  );
}

const ToastIcon: Record<ToastTypes, ReactNode> = {
  success: <Image src={iconSuccess} alt="성공 메시지 아이콘" height={25} width={25} priority />,
  warn: <Image src={iconWarn} alt="경고 메시지 아이콘" height={25} width={25} className={S.yellow} priority />,
  error: <Image src={iconError} alt="실패 메시지 아이콘" height={25} width={25} priority />,
};
