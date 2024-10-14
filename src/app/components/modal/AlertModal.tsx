import React from 'react';
import './AlertModal.scss';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAlert: () => void;
  message: string;
  alertButtonText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onAlert, message, alertButtonText = '확인' }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>
            아니오
          </button>
          <button
            className="modal-button alert"
            onClick={() => {
              onAlert();
              onClose();
            }}
          >
            {alertButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
