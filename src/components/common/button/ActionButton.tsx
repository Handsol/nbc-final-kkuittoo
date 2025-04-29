import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { Slot } from '@radix-ui/react-slot';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: string;
  children: React.ReactNode;
  disabled?: boolean;
  asChild?: boolean;
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
const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ mode, children, disabled = false, asChild = false, ...props }, ref) => {
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
      case ACTIONBUTTON_MODE.ROUNDED_MD_SMALL:
        sizeStyle = 'w-[100px] h-[36px]';
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
      case ACTIONBUTTON_MODE.ROUNDED_MD_APPLY:
        sizeStyle = 'w-[100px] h-[36px]';
        variantStyle =
          'bg-white border-2 border-main hover:bg-sub font-dohyeon text-body-sm text-main';
        roundedStyle = 'rounded-md';
        break;
      case ACTIONBUTTON_MODE.ROUNDED_MD_APPLIED:
        sizeStyle = 'w-[100px] h-[36px]';
        variantStyle =
          'flex flex-row items-center justify-center gap-2 bg-sub-light font-dohyeon text-body-sm text-main border-2 border-main hover:bg-sub';
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

    // asChild가 true일 경우, Slot을 사용하면 부모 컴포넌트(AlertDialogTrigger, AlertDialogAction....)의 역할을 그대로 수행하면서
    // 내부 버튼 스타일만!!! 입혀줌(ActionButton이 button이 아님 그냥 스타일만 입혀줌). 그래서 button 중첩(hydration 오류) 없이 스타일을 재사용할 수 있음.
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        className={`${baseStyle} ${sizeStyle} ${disabledStyle}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
