import HomeBioPage1 from './HomeBioPage1';

type HomeBioPageItemProps = {
  page: number;
};

const HomeBioPageContent = ({ page }: HomeBioPageItemProps) => {
  switch (page) {
    case 1:
      return <HomeBioPage1 />;
    case 2:
      return <p className="text-white text-lg">2페이지 콘텐츠</p>;
    case 3:
      return <p className="text-white text-lg">3페이지 콘텐츠</p>;
    default:
      return null;
  }
};

export default HomeBioPageContent;
