import React, { ReactNode } from 'react';
import S from './Modal.module.scss';
import CloseButtonIcon from '@/images/modal/close-button.svg';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  showCloseButton?: boolean;
  children?: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = function Modal({
  isOpen,
  onClose,
  width = 'auto',
  height = 'auto',
  showCloseButton = true,
  children,
  className,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={S.modalOverlay} onClick={onClose}>
      <div
        className={`${S.modalContent} ${className}`}
        style={{ width, height }}
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        {showCloseButton && (
          <button className={S.closeButton} onClick={onClose}>
            <Image src={CloseButtonIcon} alt="Close" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
