'use client';

import ApplyButton from './ApplyButton';
import AppliedButton from './AppliedButton';

type Props = {
  isApplied: boolean;
  onClick: () => void;
};

const ApplyButtonWrapper = ({ isApplied, onClick }: Props) => {
  return isApplied ? (
    <AppliedButton onClick={onClick} />
  ) : (
    <ApplyButton onClick={onClick} />
  );
};

export default ApplyButtonWrapper;
