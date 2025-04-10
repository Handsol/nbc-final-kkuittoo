import { useAddPointMutation } from '@/lib/mutations/useAddPointMutation';
import {
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from '@/lib/mutations/useHabitMutation';
import { toast } from '@/lib/hooks/use-toast';
import { Habit } from '@prisma/client';

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

  const handleAddPoint = () => {
    addPointMutation.mutate(habitId, {
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
