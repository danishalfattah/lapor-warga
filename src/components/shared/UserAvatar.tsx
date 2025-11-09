interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
};

export default function UserAvatar({ name, size = 'md', imageUrl }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary-yellow font-semibold text-dark-brown ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  );
}
