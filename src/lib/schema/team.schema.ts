import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TEAM_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

export const teamTeamSchema = z.object({
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
  maxTeamSize: z.string(),
  emblem: z.string(),
  isOpened: z.boolean(),
});

export type TeamFormSchema = z.infer<typeof teamTeamSchema>;

export const teamBioSchema = z.object({
  teamBio: z
    .string()
    .min(TEAM_VALIDATION.TEAM_BIO.MIN, TEAMS_MESSAGES.TEAM_BIO_LENGTH)
    .max(TEAM_VALIDATION.TEAM_BIO.MAX, TEAMS_MESSAGES.TEAM_BIO_LENGTH)
    .transform((value) => value.trim()),
});

export type TeamBioFormSchema = z.infer<typeof teamBioSchema>;
