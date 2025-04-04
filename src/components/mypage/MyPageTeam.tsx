const MyPageTeam = () => {
  const hasTeam = true;

  return (
    <section className="h-[300px] bg-gray-300 p-6 rounded-3xl flex flex-col">
      <div className="mb-2">
        <h1 className="text-xl font-bold">MY TEAM</h1>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {hasTeam ? (
          // 팀이 있을 경우
          <div className="w-full max-w-5xl flex flex-row gap-6">
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm">이미지 없음</span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-2 text-sm">
              <h2 className="text-xl font-semibold">팀 이름</h2>
              <p className="text-gray-700">퀘스트 이름</p>
              <div>
                <h3 className="text-sm font-semibold mb-1">기여도 75%</h3>
                <div className="w-full h-2 bg-white rounded">
                  <div className="h-2 bg-gray-700 rounded w-[75%]"></div>
                </div>
              </div>
              <p className="text-gray-600 line-clamp-2">
                팀 소개 텍스트입니다.
              </p>
              <button className="mt-auto px-4 py-1.5 bg-gray-700 text-white text-sm rounded-full self-start">
                Let's Visit My Team
              </button>
            </div>
          </div>
        ) : (
          // 팀이 없을 경우
          <div className="w-full max-w-5xl flex flex-row gap-6">
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full h-40 bg-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm">길드 이미지</span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col justify-between text-sm">
              <p className="text-gray-600">
                아직 팀에 가입하지 않았습니다. 새로운 팀을 찾거나 직접 팀을
                만들어 보세요!
              </p>
              <div className="flex gap-4 w-full mt-2">
                <button className="flex-1 px-4 py-1.5 bg-gray-700 text-white rounded-full">
                  Find new Team
                </button>
                <button className="flex-1 px-4 py-1.5 bg-gray-700 text-white rounded-full">
                  Make my Own Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPageTeam;
