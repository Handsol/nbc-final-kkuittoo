const MyPageTeam = () => {
  const hasTeam = true;

  return (
    <section className="h-full bg-gray-300 p-6 rounded-3xl flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold">MY TEAM</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {hasTeam ? (
          // 팀이 있을 경우
          <div className="w-full max-w-5xl flex flex-row gap-8">
            <div className="w-1/2 h-full flex items-center justify-center">
              <div className="w-full h-72 bg-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm">이미지 없음</span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold"> 팀 이름</h2>
              <p className="text-base text-gray-700"> 퀘스트 이름</p>
              <div>
                <h3 className="text-sm font-semibold mb-1"> 기여도 75%</h3>
                <div className="w-full h-2 bg-white rounded">
                  <div className="h-2 bg-gray-700 rounded"></div>
                </div>
              </div>
              <p className="text-gray-600">팀 소개 텍스트입니다.</p>
              <button className="mt-auto px-6 py-2 bg-gray-700 text-white rounded-full self-start">
                Let's Visit My Team
              </button>
            </div>
          </div>
        ) : (
          // 팀이 없을 경우
          <div className="w-full max-w-5xl flex flex-row gap-8">
            <div className="w-1/2 h-full flex items-center justify-center">
              <div className="w-full h-72 bg-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm">길드 이미지</span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 text-base">
                  아직 팀에 가입하지 않았습니다. 새로운 팀을 찾거나 직접 팀을
                  만들어 보세요!
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <button className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-full">
                  Find new Team
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-full">
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
