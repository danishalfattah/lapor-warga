import Image from "next/image";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  height?: number;
}

export function Logo({ className = "", height = 48 }: LogoProps) {
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Wordmark Logo Image */}
      <Image
        src="/wordmark.png"
        alt="LaporWarga"
        height={height * 0.8}
        width={height * 2.1}
        className="h-auto w-auto object-contain"
        priority
      />
    </div>
  );
}
