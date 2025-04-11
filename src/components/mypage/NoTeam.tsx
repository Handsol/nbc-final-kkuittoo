import Image from 'next/image';
import LinkButton from '../common/button/LinkButton';
import { PATH } from '@/constants/path.constants';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';
import Title from '../common/Title';

const NoTeam = () => {
  return (
    <section className="h-full w-[680px] bg-light-gray p-6 rounded-3xl flex flex-col">
      {/* 제목 */}
      <Title mode={TITLE_MODE.SECTION_TITLE}>FIND OR MAKE MY TEAM</Title>
      {/* 메인 영역 */}
      <article className="flex-1 flex items-center justify-center">
        {/* 기본 이미지 */}
        <div className="w-full max-w-5xl flex flex-row gap-6">
          <div className="w-2/5 flex items-center justify-center relative">
            <Image
              src="/images/test01.png"
              alt="Guild Image"
              fill
              className="w-full h-full rounded-md object-cover"
            />
          </div>

          {/* 팀을 찾거나 팀을 생성하는 영역 */}
          <div className="w-3/5 flex flex-col justify-between text-sm gap-4">
            <Text className="text-medium-gray">
              <span className="font-bold">
                새로운 팀을 찾거나 직접 팀을 만들어 보세요!
              </span>
              <br />
              혼자서는 작지만, 함께라면 거대한 몬스터도 거뜬해요. 지금 바로 팀에
              합류해 몬스터를 격파하는 짜릿한 협동전의 주인공이 되어보세요!
            </Text>
            {/* 버튼 wrapper */}
            <div className="flex gap-4 w-full mt-2">
              <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.RANK.TEAMS}>
                Find New Team
              </LinkButton>
              <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.MAEK_TEAM}>
                Make New Team
              </LinkButton>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default NoTeam;
