import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Pencil, X, Plus } from 'lucide-react';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import { FaCheck } from 'react-icons/fa6';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: string;
  disabled?: boolean;
};

/**
 * IconButton 컴포넌트
 * @typedef {Object} IconButtonProps
 * @property {string} mode - 버튼 모드 (예: 'edit', 'delete', 'add')
 * @property {boolean} [disabled] - 버튼 비활성화 여부 - 선택적 (기본값: false)
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ mode, disabled = false, ...props }, ref) => {
    const baseClasses =
      'w-9 h-9 flex items-center justify-center rounded-full transition-colors w-4 h-4 text-medium-gray hover:text-main';

    let icon;
    let variantClasses;

    switch (mode) {
      case ICONBUTTON_MODE.EDIT:
        icon = <Pencil className="w-[14px] h-[14px]" />;
        break;
      case ICONBUTTON_MODE.DELETE:
        icon = <X className="w-[14px] h-[14px]" />;
        break;
      case ICONBUTTON_MODE.ADD:
        icon = <Plus />;
        break;
      case ICONBUTTON_MODE.POINT:
        icon = <span className="text-body-md font-bold">+P</span>;
        variantClasses = disabled
          ? 'w-[40px] h-[40px] bg-medium-gray text-white'
          : 'w-[40px] h-[40px] bg-sub text-white';
        break;
      case ICONBUTTON_MODE.CONFIRM:
        icon = <FaCheck className="w-[12px] h-[12px]" />;
        break;
      default:
        icon = <Pencil />;
        break;
    }

    const disabledClasses =
      disabled && mode !== ICONBUTTON_MODE.POINT
        ? 'bg-medium-gray text-white cursor-not-allowed hover:bg-dark-gray hover:text-white'
        : '';

    return (
      <button
        className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
        aria-label={mode}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

export default IconButton;
