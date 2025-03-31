'use client';

import { useSampleQuery } from '../lib/queries/useSampleQuery';
import { addSampleMutation } from '../lib/mutations/useSampleMutation';

const SampleClientComponent = () => {
  const {
    data: sampleData,
    isPending: isSamplePending,
    isError: isSampleError,
  }: {
    data: any | undefined;
    isPending: any;
    isError: any;
  } = useSampleQuery();

  const { mutate: addSampleMutate } = addSampleMutation();

  if (isSamplePending) {
    return <div>is Loading...</div>;
  }

  if (isSampleError) {
    return <div>ERROR : 오류 발생</div>;
  }

  return (
    <div>
      {sampleData?.map((item: any) => (
        <div>
          {item.name}
          <button onClick={addSampleMutate}>버튼</button>
        </div>
      ))}
    </div>
  );
};

export default SampleClientComponent;
