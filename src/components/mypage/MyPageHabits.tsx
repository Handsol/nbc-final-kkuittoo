import { getServerSession } from 'next-auth';
import AddHabitButton from './AddHabitButton';
import HabitList from './HabitList';
import { fetchGetAllHabits } from '@/lib/services/habit-actions.services';
import { authOptions } from '@/lib/utils/auth';

const MyPageHabits = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <div className="p-4">로그인이 필요합니다.</div>;
  }
  const habits = await fetchGetAllHabits(session.user.id);
  const currentHabitCount = habits.length;

  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-xl font-bold text-gray-800">HABITS</h1>
        <span className="text-sm text-gray-500">({currentHabitCount}/10)</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {habits.length > 0 ? (
          <HabitList habits={habits} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            등록된 habit이 없습니다.
          </div>
        )}
      </div>

      <div className="mt-4 w-full">
        <AddHabitButton userId={session.user.id} />
      </div>
    </section>
  );
};

export default MyPageHabits;
