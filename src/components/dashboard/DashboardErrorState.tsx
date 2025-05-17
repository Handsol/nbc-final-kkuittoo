import clsx from 'clsx';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Text from '../common/Text';
import ActionButton from '../common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type DashboardErrorStateProps = {
  onRetry: () => void;
};

const DashboardErrorState = ({ onRetry }: DashboardErrorStateProps) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center gap-[24px]',
      'h-full py-[40px] px-4 text-center',
    )}
  >
    <div
      className={clsx(
        'flex flex-col items-center gap-[16px] p-[32px]',
        'bg-sub-light rounded-xl',
        'border border-sub',
        'max-w-[500px] w-full',
      )}
    >
      <AlertTriangle size={56} className="text-main" aria-hidden />

      <Text className="font-bold text-lg text-main">데이터 로딩 실패</Text>
      <Text className="text-medium-gray mb-6">
        습관 정보를 불러오는 중 문제가 발생했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </Text>

      <ActionButton
        mode={ACTIONBUTTON_MODE.ROUNDED_MD_APPLIED}
        onClick={onRetry}
      >
        <RefreshCw size={16} />
        새로고침
      </ActionButton>
    </div>
  </div>
);

export default DashboardErrorState;
