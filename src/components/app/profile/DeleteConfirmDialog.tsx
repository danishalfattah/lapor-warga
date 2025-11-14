'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Report } from '@/types/report';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  report: Report | null;
}

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  report,
}: DeleteConfirmDialogProps) {
  if (!report) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#2c2c21]">
            Hapus Laporan?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Tindakan ini tidak dapat dibatalkan. Laporan{' '}
            <span className="font-semibold text-[#2c2c21]">
              &quot;{report.title}&quot;
            </span>{' '}
            akan dihapus secara permanen dari daftar laporan Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            Hapus Laporan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
