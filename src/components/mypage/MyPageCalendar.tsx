const MyPageCalendar = () => {
  return (
    <section className="h-full bg-gray-300 p-6 rounded-3xl flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold">APRIL</h1>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="w-full h-full bg-gray-400 rounded flex items-center justify-center">
          <p className="text-white">캘린더 영역</p>
        </div>
      </div>
    </section>
  );
};

export default MyPageCalendar;
