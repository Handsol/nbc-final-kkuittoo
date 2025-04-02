const MyPage = () => {
  const habits = [
    { id: 1, title: '운동하기', notes: '매일 30분 러닝' },
    { id: 2, title: '책 읽기', notes: '하루 10페이지' },
  ];
  const hasTeam = true;

  return (
    <div className="flex flex-row gap-6 p-6">
      {/* habits */}
      <section className="flex-1 bg-gray-300 p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">HABITS</h1>
          <button className="px-8 py-1 bg-gray-700 text-white rounded-full">
            Add
          </button>
        </div>
        <div className="space-y-4">
          {habits.map((habit) => (
            <article
              key={habit.id}
              className="flex items-center gap-4 p-2 border rounded-3xl bg-zinc-800"
            >
              <button className="w-8 h-8 bg-gray-200 font-extrabold rounded-full flex items-center justify-center">
                +
              </button>
              <div>
                <h2 className="font-semibold text-white">{habit.title}</h2>
                <p className="text-sm text-white">{habit.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* calendar */}
      <section className="flex-1 bg-gray-300 p-6 rounded-3xl flex flex-col min-h-[400px]">
        <div className="mb-4">
          <h1 className="text-xl font-bold">APRIL</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-80 bg-gray-400 rounded flex items-center justify-center">
            <p className="text-white">캘린더 영역</p>
          </div>
        </div>
      </section>

      {/* my team */}
      <section className="flex-1 bg-gray-300 p-6 rounded-3xl flex flex-col min-h-[400px]">
        <div className="mb-4">
          <h1 className="text-xl font-bold">MY TEAM</h1>
        </div>
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {hasTeam ? (
              // 팀이 있을 경우
              <>
                <div className="w-48 h-32 bg-gray-400 rounded-md flex items-center justify-center">
                  <span className="text-sm">이미지 없음</span>
                </div>
                <h2 className="text-xl font-semibold">팀 이름</h2>
                <p className="text-gray-600">팀 소개 텍스트입니다.</p>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-full">
                  Let's Visit My Team
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
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
                <div className="w-48 h-32 bg-gray-400 rounded-md flex items-center justify-center">
                  <span className="text-sm">길드 이미지</span>
                </div>
                <p className="text-gray-600 text-center">
                  아직 팀에 가입하지 않았습니다. <br />
                  새로운 팀을 찾거나 직접 팀을 만들어 보세요!
                </p>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-full">
                    Find new Team
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-full">
                    Make my Own Team
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPage;
