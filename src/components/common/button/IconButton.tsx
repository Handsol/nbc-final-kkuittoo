import { ButtonHTMLAttributes } from 'react';
import { Pencil, X, Plus } from 'lucide-react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'edit' | 'delete' | 'add';
};

const IconButton = ({ variant, className = '', ...props }: IconButtonProps) => {
  let icon;
  let baseClasses =
    'w-9 h-9 flex items-center justify-center rounded-full transition-colors shrink-0';
  let variantClasses = '';

  if (variant === 'edit') {
    icon = <Pencil className="w-4 h-4" />;
    variantClasses = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
  }

  if (variant === 'delete') {
    icon = <X className="w-4 h-4" />;
    variantClasses = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
  }

  if (variant === 'add') {
    icon = <Plus className="w-5 h-5" />;
    variantClasses =
      'bg-gray-200 text-gray-800 hover:bg-gray-300 text-lg font-extrabold';
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-label={variant}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
