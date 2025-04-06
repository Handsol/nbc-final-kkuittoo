import Image from 'next/image';

const NoTeam = () => {
  return (
    <section className="h-full w-[680px] bg-gray-300 p-6 rounded-3xl flex flex-col">
      {/* 제목 */}
      <div className="mb-4">
        <h1 className="text-xl font-bold">MY TEAM</h1>
      </div>
      {/* 메인 영역 */}
      <div className="flex-1 flex items-center justify-center">
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
            <p className="text-gray-600">
              아직 팀에 가입하지 않았습니다. 새로운 팀을 찾거나 직접 팀을 만들어
              보세요! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla facilisi. Curabitur tincidunt, lacus a gravida vestibulum,
              elit nunc gravida justo, vel fermentum erat neque a turpis.
            </p>
            <div className="flex gap-4 w-full mt-2">
              <button className="flex-1 px-4 py-1.5 bg-gray-700 text-white rounded-full">
                Find new Team
              </button>
              <button className="flex-1 px-4 py-1.5 bg-gray-700 text-white rounded-full">
                Make new Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoTeam;
