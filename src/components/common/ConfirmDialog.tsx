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
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type ConfirmDialogProps = {
  contents: {
    uiButtonText: string;
    title: string;
    description: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  onClick: () => Promise<void>;
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
const ConfirmDialog = ({ contents, onClick }: ConfirmDialogProps) => {
  const {
    uiButtonText,
    title,
    description,
    cancelButtonText,
    confirmButtonText,
  } = contents;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* 화면에서 보여지는 팀 탈퇴 버튼 / 팀 조인 버튼*/}
        <ActionButton
          mode={
            uiButtonText === 'JOIN'
              ? ACTIONBUTTON_MODE.DARK_GRAY_SMALL
              : ACTIONBUTTON_MODE.ROUNDED_MD
          }
        >
          {uiButtonText}
        </ActionButton>
      </AlertDialogTrigger>
      {/* 모달창 */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <ActionButton mode={ACTIONBUTTON_MODE.SECONDARY_SMALL}>
              {cancelButtonText}
            </ActionButton>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
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
