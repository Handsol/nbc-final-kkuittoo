import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TEAM_VALIDATION } from '@/constants/validation.constants';
import { useForm } from 'react-hook-form';
import { TeamFormData } from '../services/team-client.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamBioSchema } from '../schema/team.schema';

export const useTeamBioUpdateForm = (teamBio: string) => {
  const teamBioValidation = {
    required: TEAMS_MESSAGES.TEAM_BIO_BLANK,
    minLength: {
      value: TEAM_VALIDATION.TEAM_BIO.MIN,
      message: TEAMS_MESSAGES.TEAM_BIO_LENGTH,
    },
    maxLength: {
      value: TEAM_VALIDATION.TEAM_BIO.MAX,
      message: TEAMS_MESSAGES.TEAM_BIO_LENGTH,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamBioSchema),
    defaultValues: {
      teamBio,
    },
  });

  return { teamBioValidation, register, handleSubmit, errors };
};
