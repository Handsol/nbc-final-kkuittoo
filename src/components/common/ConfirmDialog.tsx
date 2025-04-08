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

type ConfirmDialogProps = {
  contents: {
    uiButtonText: string;
    title: string;
    description: string;
    cancleButtonText: string;
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
 *  - cancleButtonText : 취소 버튼의 텍스트
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
    cancleButtonText,
    confirmButtonText,
  } = contents;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* 화면에서 보여지는 팀 탈퇴 버튼 */}
        <button>{uiButtonText}</button>
      </AlertDialogTrigger>
      {/* 모달창 */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancleButtonText}</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
