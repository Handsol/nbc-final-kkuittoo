import { Calendar } from '../ui/calendar';

const MyPageCalendar = () => {
  return (
    <section className="h-full bg-gray-200 p-6 rounded-3xl flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold">CALENDAL</h1>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="w-full h-full rounded flex items-center justify-center">
          <Calendar />
        </div>
      </div>
    </section>
  );
};

export default MyPageCalendar;
