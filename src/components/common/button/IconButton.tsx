import { ButtonHTMLAttributes } from 'react';
import { Pencil, X, Plus } from 'lucide-react';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: string;
  className?: string;
  disabled?: boolean;
};

/**
 * IconButton 컴포넌트
 * @typedef {Object} IconButtonProps
 * @property {string} mode - 버튼 모드 (예: 'edit', 'delete', 'add')
 * @property {string} [className] - 추가적인 CSS 클래스 - 선택적
 * @property {boolean} [disabled] - 버튼 비활성화 여부 - 선택적 (기본값: false)
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
const IconButton = ({
  mode,
  className = '',
  disabled = false,
  ...props
}: IconButtonProps) => {
  const baseClasses =
    'w-9 h-9 flex items-center justify-center rounded-full transition-colors shrink-0';

  let icon;
  let variantClasses;

  switch (mode) {
    case ICONBUTTON_MODE.EDIT:
      icon = <Pencil className="w-4 h-4" />;
      variantClasses = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      break;
    case ICONBUTTON_MODE.DELETE:
      icon = <X className="w-4 h-4" />;
      variantClasses = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      break;
    case ICONBUTTON_MODE.ADD:
      icon = <Plus className="w-5 h-5" />;
      variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
    default:
      icon = <Plus className="w-5 h-5" />;
      variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
  }

  const disabledClasses = disabled
    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
    : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      aria-label={mode}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
