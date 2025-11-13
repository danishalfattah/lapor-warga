import { MapPinOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapErrorFallbackProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function MapErrorFallback({ error, onRetry }: MapErrorFallbackProps) {
  return (
    <div className="relative h-full w-full bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPinOff className="w-8 h-8 text-red-600" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Gagal Memuat Peta
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Maaf, peta tidak dapat dimuat. Pastikan koneksi internet Anda stabil
          dan Google Maps API key valid.
        </p>

        {error && (
          <details className="mb-6 text-left">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 mb-2">
              Detail Error
            </summary>
            <pre className="p-3 bg-gray-50 rounded text-xs text-gray-700 overflow-auto max-h-32 text-left">
              {error.message}
            </pre>
          </details>
        )}

        {onRetry && (
          <Button
            onClick={onRetry}
            className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#2c2c21]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Coba Lagi
          </Button>
        )}
      </div>
    </div>
  );
}
