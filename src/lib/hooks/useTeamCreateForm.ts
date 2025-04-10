import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { teamTeamSchema } from '../schema/team.schema';

export type TeamFormInputs = {
  teamName: string;
  teamBio: string;
  maxTeamSize: string;
  emblem: string;
  isOpened: boolean;
};

export const useTeamCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<TeamFormInputs>({
    resolver: zodResolver(teamTeamSchema),
  });

  return { register, handleSubmit, errors, watch, control };
};
