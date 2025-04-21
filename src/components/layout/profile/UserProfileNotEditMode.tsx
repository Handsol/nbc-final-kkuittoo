'use client';

import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { ID_SLICE } from '@/constants/magic-numbers.constants';
import EditProfileButton from '@/components/layout/profile/items/EditProfileButton';
import Text from '@/components/common/Text';

type Props = {
  name: string;
  bio: string;
  userId: string;
  onEdit: () => void;
};

const UserProfileNotEditMode = ({ name, bio, userId, onEdit }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center min-h-[160px] justify-between">
      <div className="flex flex-col items-center">
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME} className="text-md">
          {name}
        </UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_ID} className="text-sm">
          @{userId.slice(ID_SLICE.USER)}
        </UserTitle>
      </div>

      <div className="min-h-[40px] flex items-center justify-center">
        <Text className="font-dohyeon text-center text-body-md">{bio}</Text>
      </div>

      <EditProfileButton onClick={onEdit} />
    </div>
  );
};

export default UserProfileNotEditMode;
