import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { ButtonHTMLAttributes } from 'react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: string;
  children: React.ReactNode;
  disabled?: boolean;
};

/**
 * 다양한 스타일의 버튼을 생성하는 컴포넌트
 * @param {ActionButtonProps} props - 버튼 속성
 * @returns {JSX.Element} 스타일이 적용된 버튼
 *
 * @example
 * <ActionButton mode="primary" onClick={handleClick}>
 *   버튼이름
 * </ActionButton>
 */
const ActionButton = ({
  mode,
  children,
  disabled = false,
  ...props
}: ActionButtonProps) => {
  const baseStyle =
    'py-2 font-semibold transition-all duration-200 ease-in-out font-dohyeon text-body-sm';

  let sizeStyle = '';
  let variantStyle = '';
  let roundedStyle = '';

  switch (mode) {
    case ACTIONBUTTON_MODE.PRIMARY:
      sizeStyle = 'w-[250px] h-[45px]';
      variantStyle = 'bg-main text-white hover:bg-sub-light';
      roundedStyle = 'rounded-full';
      break;
    case ACTIONBUTTON_MODE.SECONDARY:
      sizeStyle = 'w-[250px] h-[45px]';
      variantStyle = 'bg-sub text-black hover:bg-sub-light';
      roundedStyle = 'rounded-full';
      break;
    case ACTIONBUTTON_MODE.PRIMARY_SMALL:
      sizeStyle = 'w-[80px] h-[36px]';
      variantStyle = 'bg-main text-white hover:opacity-85';
      roundedStyle = 'rounded-full';
      break;
    case ACTIONBUTTON_MODE.SECONDARY_SMALL:
      sizeStyle = 'w-[80px] h-[36px]';
      variantStyle = 'bg-sub text-black hover:opacity-85';
      roundedStyle = 'rounded-full';
      break;
    case ACTIONBUTTON_MODE.DARK_GRAY_SMALL:
      sizeStyle = 'w-[80px] h-[36px]';
      variantStyle = 'bg-dark-gray text-white border hover:bg-medium-gray';
      roundedStyle = 'rounded-full';
      break;
    case ACTIONBUTTON_MODE.ROUNDED_MD:
      sizeStyle = 'w-[180px] h-[40px]';
      variantStyle = 'bg-main text-white hover:bg-sub';
      roundedStyle = 'rounded-md';
      break;
    case ACTIONBUTTON_MODE.ROUNDED_MD_LIGHT_GRAY:
      sizeStyle = 'w-[180px] h-[40px]';
      variantStyle =
        'bg-light-gray text-black hover:bg-medium-gray hover:text-white';
      roundedStyle = 'rounded-md';
      break;
    case ACTIONBUTTON_MODE.LOGOUT:
      sizeStyle = 'px-5 text-body-lg w-full';
      variantStyle =
        'text-black border border-transparent hover:text-white hover:bg-medium-gray bg-light-gray';
      roundedStyle = 'rounded-md';
      break;
    default:
      sizeStyle = 'w-[250px] h-[45px] text-body-md';
      variantStyle = 'bg-main text-white hover:bg-sub';
      roundedStyle = 'rounded-full';
      break;
  }

  const disabledStyle = disabled
    ? `bg-light-gray text-medium-gray cursor-not-allowed ${roundedStyle}`
    : `${variantStyle} ${roundedStyle}`;
  return (
    <button
      type={props.type || 'button'}
      disabled={disabled}
      className={`${baseStyle} ${sizeStyle} ${disabledStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
