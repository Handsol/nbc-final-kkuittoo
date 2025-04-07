type MyPageHabitsProps = {
  userId: string;
};

const MyPageProfile = ({ userId }: MyPageHabitsProps) => {
  return (
    <div className="flex-[2] p-4 rounded-xl border shadow-sm bg-white">
      <div className="flex items-center justify-evenly">
        <span className="text-2xl font-bold">Lv.1</span>
        <div className="text-center">
          <p className="text-lg font-bold">닉네임</p>
          <p className="text-sm text-gray-500">@고유아이디</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-full">
          수정
        </button>
      </div>
      <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
        <div className="h-2 w-1/2 bg-gray-500 rounded-full"></div>
      </div>
      <p className="mt-4 text-gray-700 text-center">소개글</p>
    </div>
  );
};

export default MyPageProfile;
