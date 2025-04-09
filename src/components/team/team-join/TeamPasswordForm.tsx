'use client';

import CommonInputBar from '@/components/common/CommonInputBar';
import ErrorMessage from '@/components/common/ErrorMessage';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { PATH } from '@/constants/path.constants';
import { PLACEHOLDER } from '@/constants/placeholder.constants';
import { useToast } from '@/hooks/use-toast';
import { fetchCreateTeamMember } from '@/lib/services/team-client.services';
import { checkTeamPassword } from '@/lib/utils/team-validation.utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormData = {
  teamPassword: string;
};

type TeamPasswordFormProps = {
  teamId: string;
};

const TeamPasswordForm = ({ teamId }: TeamPasswordFormProps) => {
  // toast + router
  const { toast } = useToast();
  const router = useRouter();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // 비공개 팀 가입 로직
  const onSubmit = async (data: FormData) => {
    // 사용자 입력값과 비밀번호 일치 여부 판단
    const isCorrectPassword = checkTeamPassword(teamId, data.teamPassword);
    if (!isCorrectPassword) {
      toast({
        title: '비밀번호가 다릅니다!',
        description: '비밀번호를 다시 확인해주세요.',
        variant: 'destructive',
      });

      return;
    }

    // 일치 시 POST 요청
    const newMemberData = await fetchCreateTeamMember(
      teamId,
      data.teamPassword,
    );

    if (newMemberData) {
      toast({
        title: '팀 가입 완료!',
        description: '이제 함께 모험을 떠나볼까요?',
      });

      // 팀 페이지로 이동
      router.push(`${PATH.TEAM}/${teamId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonInputBar
        id="teamPassword"
        type="type"
        placeholder={PLACEHOLDER.TEAM_PASSWORD}
        {...register('teamPassword', {
          required: TEAMS_MESSAGES.PASSWORD_REQUIRED,
          minLength: {
            value: 6,
            message: '비밀번호는 6자여야 합니다.',
          },
          maxLength: {
            value: 6,
            message: '비밀번호는 6자여야 합니다.',
          },
        })}
      />
      {errors.teamPassword && (
        <ErrorMessage>{errors.teamPassword.message}</ErrorMessage>
      )}
      <button type="submit">JOIN</button>
    </form>
  );
};

export default TeamPasswordForm;
