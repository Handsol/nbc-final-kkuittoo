import { Info, Sprout } from 'lucide-react';
import Text from '@/components/common/Text';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

const HabitEmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <li className="flex flex-col items-center gap-[16px] py-[24px] bg-sub/20 rounded-xl shadow-inner">
    <Sprout size={56} className="text-main/40" aria-hidden />

    {/* 제목 */}
    <div className="text-center">
      <Text className="mb-1 font-bold text-lg">아직 습관이 없어요</Text>
      <Text className="text-dark-gray mb-4">작은 목표부터 시작해 볼까요?</Text>

      {/* 포인트 추가 가이드 */}
      <ul className="text-body-xs md:text-body-sm text-medium-gray space-y-3 text-left mb-[16px]">
        <li className="flex items-start gap-1">
          <Info size={16} className="mt-[2px]" aria-hidden />
          <span>
            <b className="text-white bg-sub p-[6px] rounded-full">+P</b> 버튼은
            <b>설정한 요일</b>에만 활성화돼요
          </span>
        </li>
        <li className="flex items-start gap-1">
          <Info size={16} className="mt-[2px]" aria-hidden />
          <span>
            한 번 누르면 <b>1 시간</b> 동안 쿨다운되고 버튼은 비활성화!
          </span>
        </li>
        <li className="flex items-start gap-1">
          <Info size={16} className="mt-[2px]" aria-hidden />
          <span>
            하루 최대 <b>10 포인트</b>까지 획득할 수 있어요
          </span>
        </li>
      </ul>

      <ActionButton mode={ACTIONBUTTON_MODE.ROUNDED_MD} onClick={onCreate}>
        새로운 habit 추가하기
      </ActionButton>
    </div>
  </li>
);

export default HabitEmptyState;
