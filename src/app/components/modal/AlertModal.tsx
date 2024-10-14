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
        <div className="icon-container">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modal-icon"
          >
            <circle cx="12" cy="12" r="12" fill="#112211" />
          </svg>
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modal-check-icon"
          >
            <path
              d="M1.60742 5.34936L4.68778 8.50028L10.2503 1.35742"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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
