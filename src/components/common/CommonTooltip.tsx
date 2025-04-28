'use client';

import { TooltipArrow } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type CommonTooltipProps = {
  children: React.ReactNode;
  message: string | null;
  isDisabled?: boolean;
};

/**
 * tooltip 공통 컴포넌트 : 마우스 hover시 tooltip이 뜨는 컴포넌트
 *
 * @param children {ReactNode} : TooltipTrigger에 들어갈 children
 * @param message {string} : TooltipContent에 들어갈 message (실질적으로 뜨는 메세지)
 * !message는 tooltip-message.constants.tsx에 정의된 상수로 관리
 */
const CommonTooltip = ({
  children,
  message,
  isDisabled,
}: CommonTooltipProps) => {
  if (isDisabled) return <>{children}</>;
  if (!message) return <>{children}</>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
          <TooltipArrow className="fill-sub" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CommonTooltip;
