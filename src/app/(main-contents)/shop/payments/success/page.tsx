import LinkButton from '@/components/common/button/LinkButton';
import Title from '@/components/common/Title';
import { IMAGE_ASSETS } from '@/constants/assets.constants';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { paymentResultPageStyle } from '@/styles/paymentResultStyles';
import Image from 'next/image';

const PaymentSuccessPage = () => {
  return (
    <div className={paymentResultPageStyle}>
      <Title mode={TITLE_MODE.SECTION_TITLE}>구매가 완료되었습니다.</Title>
      <Image
        src={IMAGE_ASSETS.SHOP.SUCCESS}
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

export default PaymentSuccessPage;
