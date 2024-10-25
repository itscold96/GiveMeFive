import { ReactNode } from 'react';
import Button from '../@shared/button/Button';
import Modal from '../@shared/modal/Modal';
import S from './ReservationModal.module.scss';

//TODO: 예약 관련 모달 모듈화, 현재 기준 날짜 지나면 날짜 선택 불가능하도록 예약 가능 날짜 배열 필터 처리 조건 추가
interface ReservationModalProps {
  children: ReactNode;
  triggerButtonText: string;
  isModalOpen: boolean;
  onTriggerButtonClick: () => void;
  onCloseModal: () => void;
  modalTitle: string;
  className?: string;
  modalHeight?: string;
  modalWidth?: string;
  triggerButtonClassName?: string;
}

export default function ReservationModal({
  children,
  triggerButtonText,
  isModalOpen,
  onTriggerButtonClick,
  onCloseModal,
  modalHeight = '100dvh',
  modalWidth = '100dvw',
  modalTitle,
  triggerButtonClassName,
}: ReservationModalProps) {
  return (
    <>
      <button className={triggerButtonClassName} onClick={onTriggerButtonClick}>
        {triggerButtonText}
      </button>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} width={modalWidth} height={modalHeight} className={S.modal}>
        <p className={S.modalTitle}>{modalTitle}</p>
        {children}
        <Button
          borderRadius="radius4"
          buttonColor="nomadBlack"
          padding="padding14"
          textSize="md"
          className={S.modalCloseButton}
          onClick={onCloseModal}
        >
          확인
        </Button>
      </Modal>
    </>
  );
}
