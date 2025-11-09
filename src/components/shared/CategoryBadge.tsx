interface CategoryBadgeProps {
  category: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  infrastruktur: { bg: 'bg-blue-100', text: 'text-blue-700' },
  kebersihan: { bg: 'bg-green-100', text: 'text-green-700' },
  keamanan: { bg: 'bg-red-100', text: 'text-red-700' },
  kesehatan: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  lainnya: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = categoryColors[category] || categoryColors.lainnya;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}
