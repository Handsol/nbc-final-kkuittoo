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
    <article className="flex-1 overflow-y-auto">
      {isCreating ? (
        <HabitForm onCancel={onToggleCreate} onSuccess={handleCreateSuccess} />
      ) : habits.length > 0 ? (
        <div className="space-y-4">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} userId={userId} />
          ))}
        </div>
      ) : (
        <Text>등록된 habit이 없습니다.</Text>
      )}
    </article>
  );
};
export default HabitList;
