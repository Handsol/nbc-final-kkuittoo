import Text from '@/components/common/Text';
import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { HabitFormData, HabitWithPoints } from '@/types/habits.type';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';

type HabitListProps = {
  userId: string;
  habits: HabitWithPoints[];
  isCreating: boolean;
  onToggleCreate: () => void;
};

const HabitList = ({
  habits,
  userId,
  isCreating,
  onToggleCreate,
}: HabitListProps) => {
  const createMutation = useCreateHabitMutation(userId);

  const handleCreateSuccess = (habitData: HabitFormData) => {
    createMutation.mutate(habitData, {
      onSuccess: () => {
        onToggleCreate();
      },
      onError: (error) => {
        console.error('습관 생성 실패:', error);
      },
    });
  };

  return (
    <ul className="h-[460px] overflow-y-auto">
      {isCreating ? (
        <div className="h-full flex items-center justify-center">
          <HabitForm
            onCancel={onToggleCreate}
            onSuccess={handleCreateSuccess}
          />
        </div>
      ) : habits.length > 0 ? (
        <div className="space-y-4">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} userId={userId} />
          ))}
        </div>
      ) : (
        <Text>등록된 habit이 없습니다.</Text>
      )}
    </ul>
  );
};
export default HabitList;
