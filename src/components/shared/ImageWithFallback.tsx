"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackSrc = "/images/placeholder.jpg",
  fill = false,
  width,
  height,
  objectFit = "cover",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        style={{ objectFit }}
        onError={handleError}
        unoptimized={imgSrc.startsWith("http")}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      style={{ objectFit }}
      onError={handleError}
      unoptimized={imgSrc.startsWith("http")}
    />
  );
}
