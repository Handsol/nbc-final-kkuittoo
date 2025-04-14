import { useAddPointMutation } from '@/lib/mutations/useAddPointMutation';
import {
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from '@/lib/mutations/useHabitMutation';
import { toast } from '@/lib/hooks/use-toast';
import { Habit } from '@prisma/client';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';

type useHabitItemHandlersProps = {
  userId: string;
  habitId: string;
  onEditToggle: (isEditing: boolean) => void;
};

export const useHabitItemHandlers = ({
  userId,
  habitId,
  onEditToggle,
}: useHabitItemHandlersProps) => {
  const addPointMutation = useAddPointMutation(userId);
  const updateMutation = useUpdateHabitMutation(userId, habitId);
  const deleteMutation = useDeleteHabitMutation(userId, habitId);

  const handleAddPoint = (todayPoints: number) => {
    if (todayPoints >= 10) {
      toast({
        title: '알림',
        description: '하루 최대 10포인트까지 획득 가능합니다.',
      });
      return;
    }
    addPointMutation.mutate(habitId, {
      onSuccess: () =>
        toast({ title: '성공', description: '포인트가 추가되었습니다.' }),
      onError: (err) => {
        const errorMessage =
          err.message === HABIT_ERROR_MESSAGES.DAILY_POINT_LIMIT_EXCEEDED
            ? '하루 최대 10포인트까지 획득 가능합니다.'
            : `포인트 추가 실패: ${err.message}`;
        toast({
          title: '실패',
          description: errorMessage,
        });
      },
    });
  };

  const handleUpdateHabit = (
    updatedHabit: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
  ) => {
    updateMutation.mutate(updatedHabit, {
      onSuccess: () => {
        toast({ title: '성공', description: '습관이 수정되었습니다.' });
        onEditToggle(false);
      },
      onError: (err) =>
        toast({ title: '실패', description: `습관 수정 실패: ${err.message}` }),
    });
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

  return {
    handleAddPoint,
    handleUpdateHabit,
    handleDeleteHabit,
    isAddPending: addPointMutation.isPending,
    isUpdatePending: updateMutation.isPending,
    isDeletePending: deleteMutation.isPending,
  };
};
