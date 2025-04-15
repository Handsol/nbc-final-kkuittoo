import { ServiceInfo1, ServiceInfo2, ServiceInfo3 } from './items/BioPageItem';

const HomeBioPage1 = () => {
  return (
    <article className="flex flex-col items-center justify-center text-center gap-6">
      <ServiceInfo1 />
      <ServiceInfo2 />
      <ServiceInfo3 />
    </article>
  );
};

export default HomeBioPage1;
