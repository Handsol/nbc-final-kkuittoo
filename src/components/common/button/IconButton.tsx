import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Pencil, X, Plus } from 'lucide-react';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import { FaCheck } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Text from '../Text';
import { formatCooldownTime } from '@/lib/utils/habit-points.utils';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: string;
  disabled?: boolean;
  cooldownSeconds?: number;
};

/**
 * IconButton 컴포넌트
 * @typedef {Object} IconButtonProps
 * @property {string} mode - 버튼 모드 (예: 'edit', 'delete', 'add')
 * @property {boolean} [disabled] - 버튼 비활성화 여부 - 선택적 (기본값: false)
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ mode, disabled = false, cooldownSeconds = 0, ...props }, ref) => {
    const baseClasses =
      'w-4 h-4 flex items-center justify-center rounded-full transition-colors';

    let icon;
    let variantClasses;

    switch (mode) {
      case ICONBUTTON_MODE.EDIT:
        icon = <Pencil className="w-[14px] h-[14px] text-medium-gray" />;
        break;
      case ICONBUTTON_MODE.DELETE:
        icon = <X className="w-[14px] h-[14px] text-medium-gray" />;
        break;
      case ICONBUTTON_MODE.ADD:
        icon = <Plus />;
        break;
      case ICONBUTTON_MODE.POINT:
        icon = disabled ? (
          cooldownSeconds > 0 ? (
            <Text className="text-body-xs font-bold">
              {formatCooldownTime(cooldownSeconds)}
            </Text>
          ) : (
            <Text className="text-body-md font-bold">+P</Text>
          )
        ) : (
          <motion.span
            whileHover={{
              rotate: [0, -10, 10, -10, 10, -10, 10, 0],
              scale: 1.2,
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
            className="text-body-md font-bold"
          >
            +P
          </motion.span>
        );

        variantClasses = disabled
          ? 'w-[40px] h-[40px] bg-medium-gray text-white'
          : 'w-[40px] h-[40px] bg-[#FFAA32] border-4 border-[#FFC864] text-[#FFDB98]';
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
        ? 'bg-medium-gray text-white cursor-not-allowed'
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
