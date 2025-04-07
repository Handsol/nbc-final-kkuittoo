import { useForm } from 'react-hook-form';

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
  } = useForm<TeamFormInputs>();

  return { register, handleSubmit, errors, watch, control };
};
