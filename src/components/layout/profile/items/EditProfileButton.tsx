import { Pencil } from 'lucide-react';
import React from 'react';

const EditProfileButton = () => {
  return (
    <button className="flex flex-row justify-center items-center gap-2">
      <Pencil className="w-[18px] h-[18px] text-main" />
      <p className="font-dohyeon text-body-sm text-main">Edit Profile</p>
    </button>
  );
};

export default EditProfileButton;
