import Image from "next/image";

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
}

const sizeClasses = {
  sm: 'h-9 w-9',
  md: 'h-12 w-12',
  lg: 'h-24 w-24',
};

const sizePixels = {
  sm: 36,
  md: 48,
  lg: 96,
};

export default function UserAvatar({ name, size = 'md', imageUrl }: UserAvatarProps) {
  // Generate dummy avatar URL using DiceBear API
  // Uses "avataaars" style for consistent, professional avatars
  const avatarUrl = imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=FACC15`;

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-[#FACC15] ring-2 ring-white/50`}>
      <Image
        src={avatarUrl}
        alt={name}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className="object-cover"
        unoptimized // Allow external SVG from DiceBear
      />
    </div>
  );
}
