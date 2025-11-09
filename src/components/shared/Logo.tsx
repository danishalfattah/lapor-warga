interface LogoProps {
  className?: string;
  isDark?: boolean;
  height?: number;
}

export function Logo({ className = "", height = 48 }: LogoProps) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Logo Icon - Megaphone/Report Icon */}
      <svg
        width={height * 0.75}
        height={height * 0.75}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          fill="#FACC15"
          stroke="#FACC15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="#35750f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="#35750f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Logo Text */}
      <span
        className={`font-bold text-white`}
        style={{ fontSize: `${height * 0.4}px`, lineHeight: 1 }}
      >
        LaporWarga
      </span>
    </div>
  );
}
