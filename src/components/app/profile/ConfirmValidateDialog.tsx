"use client";

import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Report } from "@/types/report";

interface ConfirmValidateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  report: Report | null;
}

export function ConfirmValidateDialog({
  open,
  onClose,
  onConfirm,
  report,
}: ConfirmValidateDialogProps) {
  if (!report) return null;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2 pr-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            </div>
            <AlertDialogTitle className="text-lg sm:text-xl font-bold text-[#2c2c21] leading-tight">
              Konfirmasi Tandai Selesai
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-xs sm:text-sm text-gray-600 space-y-3 pt-2">
            <p className="leading-relaxed">
              Anda akan menandai laporan{" "}
              <span className="font-semibold text-[#2c2c21]">
                &quot;{report.title}&quot;
              </span>{" "}
              sebagai selesai.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
              <p className="font-semibold text-amber-900 mb-1.5 flex items-center gap-2 text-xs sm:text-sm">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                Perhatian
              </p>
              <p className="text-amber-800 text-xs leading-relaxed">
                Status laporan akan berubah menjadi &quot;Selesai&quot; dan{" "}
                <strong>tidak dapat dikembalikan</strong> ke status &quot;Pending&quot;.
                Pastikan masalah sudah benar-benar terselesaikan.
              </p>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Laporan yang sudah ditandai selesai akan tetap terlihat di halaman
              profil Anda dengan badge status &quot;Selesai&quot;.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
          <AlertDialogCancel
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50 w-full sm:w-auto order-2 sm:order-1 mt-0"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-[#35750f] hover:bg-[#35750f]/90 text-white font-semibold w-full sm:w-auto order-1 sm:order-2"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Ya, Tandai Selesai
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
