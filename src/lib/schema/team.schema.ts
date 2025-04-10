import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TEAM_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

const baseTeamSchema = z.object({
  teamName: z
    .string()
    .min(TEAM_VALIDATION.TEAM_NAME.MIN, TEAMS_MESSAGES.TEAM_NAME_LENGTH)
    .max(TEAM_VALIDATION.TEAM_NAME.MAX, TEAMS_MESSAGES.TEAM_NAME_LENGTH)
    .transform((value) => value.trim()),
  teamBio: z
    .string()
    .min(TEAM_VALIDATION.TEAM_BIO.MIN, TEAMS_MESSAGES.TEAM_BIO_LENGTH)
    .max(TEAM_VALIDATION.TEAM_BIO.MAX, TEAMS_MESSAGES.TEAM_BIO_LENGTH)
    .transform((value) => value.trim()),
});
