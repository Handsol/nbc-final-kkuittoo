const MyPageTeam = () => {
  const hasTeam = false;

  return (
    <section className="h-[550px] bg-gray-300 p-6 rounded-3xl flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold">MY TEAM</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          {hasTeam ? (
            // 팀이 있을 경우
            <>
              <div className="w-full max-w-md h-32 bg-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm">이미지 없음</span>
              </div>
              <h2 className="text-xl font-semibold">팀 이름</h2>
              <p className="text-gray-600 text-center">팀 소개 텍스트입니다.</p>
              <button className="px-6 py-2 bg-gray-700 text-white rounded-full">
                Let's Visit My Team
              </button>
              <div className="w-full max-w-md flex items-center gap-6">
                <div className="w-28 h-28 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-xs text-center">
                    이미지X
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">본인의 기여도 75%</h3>
                  <div className="w-full h-2 bg-white rounded"></div>
                </div>
              </div>
            </>
          ) : (
            // 팀이 없을 경우
            <>
              <div className="w-full max-w-md h-56 bg-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm">길드 이미지</span>
              </div>
              <p className="text-gray-600 text-center">
                아직 팀에 가입하지 않았습니다. 새로운 팀을 찾거나 직접 팀을
                만들어 보세요!
              </p>
              <div className="flex flex-col gap-2 w-full max-w-xs px-4 sm:px-0">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-full w-full min-w-0 truncate">
                  Find new Team
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-full w-full min-w-0 truncate">
                  Make my Own Team
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyPageTeam;
