import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import { useAddPointMutation } from '@/lib/mutations/useAddPointMutation';
import HabitForm from './HabitForm';
import {
  getCooldownStatus,
  getCurrentDayStatus,
} from '@/lib/utils/habit.utils';
import {
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from '@/lib/mutations/useHabitMutation';
import { toast } from '@/hooks/use-toast';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';

type HabitItemProps = {
  habit: Habit & { userPoints: UserPoint[] };
  userId: string;
};

const HabitItem = ({ habit, userId }: HabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const addPointMutation = useAddPointMutation(userId);
  const updateMutation = useUpdateHabitMutation(userId, habit.id);
  const deleteMutation = useDeleteHabitMutation(userId, habit.id);

  const handleAddPoint = () => {
    addPointMutation.mutate(habit.id, {
      onSuccess: () =>
        toast({ title: '성공', description: '포인트가 추가되었습니다.' }),
      onError: (err) =>
        toast({
          title: '실패',
          description: `포인트 추가 실패: ${err.message}`,
        }),
    });
  };

  const handleUpdateHabit = (
    updatedHabit: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
  ) => {
    updateMutation.mutate(updatedHabit, {
      onSuccess: () =>
        toast({ title: '성공', description: '습관이 수정되었습니다.' }),
      onError: (err) =>
        toast({ title: '실패', description: `습관 수정 실패: ${err.message}` }),
    });
    setIsEditing(false);
  };

  const handleDeleteHabit = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () =>
        toast({ title: '성공', description: 'Habit이 삭제되었습니다.' }),
      onError: (err) =>
        toast({
          title: '실패',
          description: `Habit 삭제 실패: ${err.message}`,
        }),
    });
  };

  const isValidDay = getCurrentDayStatus(habit);
  const isCooldownActive = getCooldownStatus(habit.userPoints);
  const isDisabled =
    !isValidDay || isCooldownActive || addPointMutation.isPending;

  return (
    <div className="flex flex-col gap-2">
      <article className="flex items-center gap-4 p-4 border rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <IconButton
          mode={ICONBUTTON_MODE.ADD}
          onClick={handleAddPoint}
          disabled={isDisabled}
        />

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-800 truncate">
            {habit.title}
          </h2>
          <p className="text-sm text-gray-600 truncate">{habit.notes}</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <IconButton
            mode={ICONBUTTON_MODE.EDIT}
            onClick={() => setIsEditing(true)}
          />
          <IconButton
            mode={ICONBUTTON_MODE.DELETE}
            onClick={handleDeleteHabit}
          />
        </div>
      </article>

      {isEditing && (
        <HabitForm
          initialHabit={habit}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleUpdateHabit}
        />
      )}
    </div>
  );
};

export default HabitItem;
