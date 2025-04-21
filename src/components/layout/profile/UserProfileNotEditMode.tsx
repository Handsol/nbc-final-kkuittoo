'use client';

import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { ID_SLICE } from '@/constants/magic-numbers.constants';
import EditProfileButton from '@/components/layout/profile/items/EditProfileButton';

type Props = {
  name: string;
  bio: string;
  userId: string;
  onEdit: () => void;
};

const UserProfileNotEditMode = ({ name, bio, userId, onEdit }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <UserTitle mode={USER_TITLE_MODE.CARD_NAME} className="text-md">
        {name}
      </UserTitle>
      <UserTitle mode={USER_TITLE_MODE.CARD_ID} className="text-sm">
        @{userId.slice(ID_SLICE.USER)}
      </UserTitle>
      <p className="font-dohyeon text-center text-xs">{bio}</p>
      <EditProfileButton onClick={onEdit} />
    </div>
  );
};

export default UserProfileNotEditMode;
