'use client';

import { useState } from 'react';
import { UserFormData } from '@/lib/services/user-client.services';
import UserProfileEditMode from './UserProfileEditMode';
import UserProfileNotEditMode from './UserProfileNotEditMode';

type Props = {
  name: string;
  bio: string;
  userId: string;
};

const UserProfileEdit = ({ name, bio, userId }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const props: UserFormData & { userId: string } = {
    name,
    bio,
    userId,
  };

  return isEditMode ? (
    <UserProfileEditMode
      {...props}
      onCancel={() => setIsEditMode(false)}
      onSuccess={() => setIsEditMode(false)}
    />
  ) : (
    <UserProfileNotEditMode {...props} onEdit={() => setIsEditMode(true)} />
  );
};

export default UserProfileEdit;
