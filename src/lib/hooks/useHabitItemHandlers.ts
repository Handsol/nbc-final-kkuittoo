import { useAddPointMutation } from '@/lib/mutations/useAddPointMutation';
import {
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from '@/lib/mutations/useHabitMutation';
import { toast } from '@/lib/hooks/use-toast';
import { Habit } from '@prisma/client';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { isDailyPointsLimitExceeded } from '../utils/habit-points.utils';
import { HABIT_TOAST_MESSAGES } from '@/constants/toast-messages.contants';

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
    if (isDailyPointsLimitExceeded(todayPoints)) {
      toast(HABIT_TOAST_MESSAGES.FAIL.POINT_LIMIT_EXCEEDED);
      return;
    }

    addPointMutation.mutate(habitId, {
      onSuccess: () => toast(HABIT_TOAST_MESSAGES.SUCCESS.POINT_ADD),
      onError: (err) => {
        const errorMessage =
          err.message === HABIT_ERROR_MESSAGES.DAILY_POINT_LIMIT_EXCEEDED
            ? HABIT_TOAST_MESSAGES.FAIL.POINT_LIMIT_EXCEEDED.description
            : HABIT_TOAST_MESSAGES.FAIL.POINT_ADD.description;
        toast({
          title: HABIT_TOAST_MESSAGES.FAIL.POINT_ADD.title,
          description: errorMessage,
          variant: 'destructive',
        });
      },
    });
  };

  const handleUpdateHabit = (
    updatedHabit: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
  ) => {
    updateMutation.mutate(updatedHabit, {
      onSuccess: () => {
        toast(HABIT_TOAST_MESSAGES.SUCCESS.HABIT_UPDATE);
        onEditToggle(false);
      },
      onError: (err) =>
        toast({
          title: HABIT_TOAST_MESSAGES.FAIL.HABIT_UPDATE.title,
          description: `${HABIT_TOAST_MESSAGES.FAIL.HABIT_UPDATE.description}: ${err.message}`,
        }),
    });
  };

  const handleDeleteHabit = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => toast(HABIT_TOAST_MESSAGES.SUCCESS.HABIT_DELETE),
      onError: (err) =>
        toast({
          title: HABIT_TOAST_MESSAGES.FAIL.HABIT_DELETE.title,
          description: `${HABIT_TOAST_MESSAGES.FAIL.HABIT_DELETE.description}: ${err.message}`,
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
