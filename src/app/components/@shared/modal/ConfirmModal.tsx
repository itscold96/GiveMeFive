import React from 'react';
import S from './ConfirmModal.module.scss';
import Button from '../button/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmButtonText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmButtonText = '확인',
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={S.modalOverlay}>
      <div className={S.modalContent}>
        <p className={S.modalMessage}>{message}</p>
        <div className={S.modalButtons}>
          <Button
            className={S.modalButton}
            buttonColor="nomadBlack"
            textSize="lg"
            borderRadius="radius4"
            padding="padding8"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
