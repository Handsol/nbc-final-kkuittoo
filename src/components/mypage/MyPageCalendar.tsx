import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '../common/Title';
import { Calendar } from '../ui/calendar';

const MyPageCalendar = () => {
  return (
    <section className="h-full bg-gray-200 p-6 rounded-3xl flex flex-col">
      <div className="mb-4">
        <Title mode={TITLE_MODE.SECTION_TITLE}>CALENDAL</Title>
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
