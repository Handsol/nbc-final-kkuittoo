'use client';

import ActionButton from '@/components/common/button/ActionButton';
import CommonInputBar from '@/components/common/CommonInputBar';
import ErrorMessage from '@/components/common/ErrorMessage';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { PLACEHOLDER } from '@/constants/placeholder.constants';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { useToast } from '@/lib/hooks/use-toast';
import { fetchCreateTeamMember } from '@/lib/services/team-client.services';
import { checkTeamPassword } from '@/lib/utils/team-validation.utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type TeamPasswordFormData = {
  teamPassword: string;
};

type TeamPasswordFormProps = {
  teamId: string;
  onSuccess?: () => void;
};

const TeamPasswordForm = ({ teamId, onSuccess }: TeamPasswordFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamPasswordFormData>();

  // 비공개 팀 가입 로직
  const onSubmit = async (data: TeamPasswordFormData) => {
    // 사용자 입력값과 비밀번호 일치 여부 판단
    const isCorrectPassword = checkTeamPassword(teamId, data.teamPassword);
    if (!isCorrectPassword) {
      toast({
        title: TEAM_TOAST_MESSAGES.FAIL.TEAM_PASSWORD.TITLE,
        description: TEAM_TOAST_MESSAGES.FAIL.TEAM_PASSWORD.DESCRIPTION,
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
        title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_JOIN.TITLE,
        description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_JOIN.DESCRIPTION(),
      });

      onSuccess?.();

      // 팀 페이지로 이동 및 새로고침
      router.push(`${PATH.TEAM}/${teamId}`);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-8"
    >
      <CommonInputBar
        id="teamPassword"
        type="type"
        placeholder={PLACEHOLDER.TEAM_PASSWORD}
        {...register('teamPassword', {
          required: TEAMS_MESSAGES.PASSWORD_REQUIRED,
          minLength: {
            value: 6,
            message: TEAMS_MESSAGES.PASSWORD_LENGTH,
          },
          maxLength: {
            value: 6,
            message: TEAMS_MESSAGES.PASSWORD_LENGTH,
          },
        })}
      />
      {errors.teamPassword && (
        <ErrorMessage>{errors.teamPassword.message}</ErrorMessage>
      )}
      <ActionButton mode={ACTIONBUTTON_MODE.ROUNDED_MD} type="submit">
        JOIN
      </ActionButton>
    </form>
  );
};

export default TeamPasswordForm;
