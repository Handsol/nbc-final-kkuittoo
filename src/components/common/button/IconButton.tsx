import { ButtonHTMLAttributes } from 'react';
import { Pencil, X, Plus } from 'lucide-react';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';

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
const IconButton = ({ mode, disabled = false, ...props }: IconButtonProps) => {
  const baseClasses =
    'w-9 h-9 flex items-center justify-center rounded-full transition-colors w-4 h-4 text-medium-gray hover:text-main';

  let icon;
  let variantClasses;

  switch (mode) {
    case ICONBUTTON_MODE.EDIT:
      icon = <Pencil />;
      break;
    case ICONBUTTON_MODE.DELETE:
      icon = <X />;
      break;
    case ICONBUTTON_MODE.ADD:
      icon = <Plus />;
      break;
    case ICONBUTTON_MODE.POINT:
      icon = <span className="text-body-md font-bold">+P</span>;
      variantClasses = 'w-[40px] h-[40px] bg-light-gray';
      break;
    default:
      icon = <Pencil />;
      break;
  }

  const disabledClasses = disabled
    ? 'bg-medium-gray text-white cursor-not-allowed hover:bg-dark-gray hover:text-white'
    : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
      aria-label={mode}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
