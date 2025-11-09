'use client';

import { useState } from 'react';
import Modal from './Modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
}

export default function ShareModal({ isOpen, onClose, reportId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/reports/${reportId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bagikan Laporan">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 rounded-lg border border-dark-brown/20 px-4 py-2 text-sm text-dark-brown"
          />
          <button
            onClick={copyToClipboard}
            className="rounded-lg bg-primary-yellow px-4 py-2 font-semibold text-dark-brown transition hover:bg-primary-yellow/90"
          >
            {copied ? 'Tersalin!' : 'Salin'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button className="rounded-lg border border-dark-brown/20 p-4 text-center transition hover:bg-cream">
            <div className="mb-2">📱</div>
            <div className="text-xs text-dark-brown">WhatsApp</div>
          </button>
          <button className="rounded-lg border border-dark-brown/20 p-4 text-center transition hover:bg-cream">
            <div className="mb-2">🐦</div>
            <div className="text-xs text-dark-brown">Twitter</div>
          </button>
          <button className="rounded-lg border border-dark-brown/20 p-4 text-center transition hover:bg-cream">
            <div className="mb-2">📧</div>
            <div className="text-xs text-dark-brown">Email</div>
          </button>
        </div>
      </div>
    </Modal>
  );
}
