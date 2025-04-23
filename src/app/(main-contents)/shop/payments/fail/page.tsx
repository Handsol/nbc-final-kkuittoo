import LinkButton from '@/components/common/button/LinkButton';
import Title from '@/components/common/Title';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { paymentResultPageStyle } from '@/styles/paymentResultStyles';
import Image from 'next/image';

const PaymentFailPage = async () => {
  return (
    <div className={paymentResultPageStyle}>
      <Title mode={TITLE_MODE.SECTION_TITLE}>구매에 실패했습니다.</Title>
      <Title mode={TITLE_MODE.SECTION_TITLE}>다시 시도해주세요!</Title>
      <Image
        src={IMAGE_ASSETS.SHOP.FAIL}
        alt="Payment Success Image"
        width={300}
        height={300}
      />
      <LinkButton href={PATH.SHOP} mode={LINKBUTTON_MODE.SHOP}>
        상점으로 돌아가기
      </LinkButton>
    </div>
  );
};

export default PaymentFailPage;
