import { FieldError, FieldErrors } from 'react-hook-form';
import { TeamFormInputs } from './useTeamCreateForm';
import { PLACEHOLDER } from '@/constants/placeholder.constants';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TEAM_VALIDATION } from '@/constants/validation.constants';
import { EMBLEM } from '@/constants/teams.constants';

export type TeamFormContents = {
  title: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required: string;
  minLength: {
    value: number;
    message: string;
  };
  maxLength: {
    value: number;
    message: string;
  };
  error: FieldError | undefined;
}[];

export const useTeamCreateContents = (errors: FieldErrors<TeamFormInputs>) => {
  // input으로 사용자 입력값 받는 요소들 : teamName, teamBio
  const teamFormContents: TeamFormContents = [
    {
      title: 'TEAM NAME',
      id: 'teamName',
      name: 'teamName',
      type: 'text',
      placeholder: PLACEHOLDER.TEAM_NAME,
      required: TEAMS_MESSAGES.TEAM_NAME_BLANK,
      minLength: {
        value: TEAM_VALIDATION.TEAM_NAME.MIN,
        message: TEAMS_MESSAGES.TEAM_NAME_LENGTH,
      },
      maxLength: {
        value: TEAM_VALIDATION.TEAM_NAME.MAX,
        message: TEAMS_MESSAGES.TEAM_NAME_LENGTH,
      },
      error: errors.teamName,
    },
    {
      title: 'TEAM BIO',
      id: 'teamBio',
      name: 'teamBio',
      type: 'text',
      placeholder: PLACEHOLDER.TEAM_BIO,
      required: TEAMS_MESSAGES.TEAM_BIO_BLANK,
      minLength: {
        value: TEAM_VALIDATION.TEAM_BIO.MIN,
        message: TEAMS_MESSAGES.TEAM_BIO_LENGTH,
      },
      maxLength: {
        value: TEAM_VALIDATION.TEAM_BIO.MAX,
        message: TEAMS_MESSAGES.TEAM_BIO_LENGTH,
      },
      error: errors.teamBio,
    },
  ];

  // emblem
  const emblemOptions = [
    { id: 'LION', src: EMBLEM.LION },
    { id: 'OWL', src: EMBLEM.OWL },
    { id: 'CAT', src: EMBLEM.CAT },
    { id: 'DEER', src: EMBLEM.DEER },
  ];

  return { teamFormContents, emblemOptions };
};
