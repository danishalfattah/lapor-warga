"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Terjadi Kesalahan
        </h1>

        <p className="text-gray-600 mb-6">
          Maaf, aplikasi mengalami masalah. Silakan coba muat ulang halaman atau kembali ke beranda.
        </p>

        {error.message && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 mb-2">
              Detail Error
            </summary>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </details>
        )}

        <div className="flex gap-3">
          <Button
            onClick={reset}
            className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#2c2c21]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Muat Ulang
          </Button>

          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="flex-1"
          >
            <Home className="w-4 h-4 mr-2" />
            Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
