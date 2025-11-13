"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Terjadi Kesalahan
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Maaf, ada yang tidak beres. Silakan coba muat ulang komponen ini.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                  Detail Error
                </summary>
                <pre className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-700 overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <Button
              onClick={this.handleReset}
              className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#2c2c21]"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Coba Lagi
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
