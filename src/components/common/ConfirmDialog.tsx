'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ActionButton from './button/ActionButton';
import { ACTIONBUTTON_MODE, JOINBUTTON_MODE } from '@/constants/mode.constants';

type ConfirmDialogProps = {
  contents: {
    uiButtonText: string;
    title: string;
    description: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  onClick: () => Promise<void>;
  children?: React.ReactNode;
  mode?: string;
};

/**
 * 사용자 Confirm 모달창 ( window.confirm과 비슷 )
 *
 * 1. contents에 들어가야하는 key
 *  - uiButtonText : UI로 렌더링 되는 버튼의 텍스트
 *  - title : 모달창 타이틀
 *  - description : 모달창 서브 텍스트
 *  - cancelButtonText : 취소 버튼의 텍스트
 *  - confirmButtonText : 확인 버튼의 텍스트
 *
 * @param contents {Object}
 * @param onClick {() => Promise<void>}
 * @returns
 */
const ConfirmDialog = ({
  contents,
  onClick,
  children,
  mode,
}: ConfirmDialogProps) => {
  const {
    uiButtonText,
    title,
    description,
    cancelButtonText,
    confirmButtonText,
  } = contents;
  const isTeamJoinButton = mode === JOINBUTTON_MODE.TEAM_PAGE;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* 
        children이 있을 경우 - cildren에 해당하는 버튼이 화면에 보이고, 
        children이 없을 경우 - 화면에서 팀 탈퇴 버튼 or 팀 조인 버튼이 보임
        */}
        {children || (
          <ActionButton
            mode={
              uiButtonText === '가입하기' && !isTeamJoinButton
                ? ACTIONBUTTON_MODE.DARK_GRAY_SMALL
                : ACTIONBUTTON_MODE.ROUNDED_MD
            }
          >
            {uiButtonText}
          </ActionButton>
        )}
      </AlertDialogTrigger>
      {/* 모달창 */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 justify-center">
          {/* button안에 button이 또 들어가서 hydration 오류가 발생했는데, asChild를 넣어서 자식요소만 button이 되도록 해결*/}
          <AlertDialogCancel asChild>
            <ActionButton mode={ACTIONBUTTON_MODE.SECONDARY_SMALL}>
              {cancelButtonText}
            </ActionButton>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick} asChild>
            <ActionButton mode={ACTIONBUTTON_MODE.PRIMARY_SMALL}>
              {confirmButtonText}
            </ActionButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
