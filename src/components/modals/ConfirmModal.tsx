'use client';

import Modal from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-6 text-dark-brown/70">{message}</p>
      <div className="flex gap-4">
        <button
          onClick={onClose}
          className="flex-1 rounded-lg border border-dark-brown/20 px-4 py-2 text-dark-brown transition hover:bg-cream"
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="flex-1 rounded-lg bg-primary-yellow px-4 py-2 font-semibold text-dark-brown transition hover:bg-primary-yellow/90"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
