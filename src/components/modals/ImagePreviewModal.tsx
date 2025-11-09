'use client';

import Modal from './Modal';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

export default function ImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  alt = 'Preview',
}: ImagePreviewModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <img src={imageUrl} alt={alt} className="w-full rounded-lg" />
    </Modal>
  );
}
