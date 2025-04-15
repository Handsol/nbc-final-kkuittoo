import HomeBioPage1 from './contents/HomeBioPage1';
import HomeBioPage2 from './contents/HomeBioPage2';
import HomeBioPage3 from './contents/HomeBioPage3';

type HomeBioPageItemProps = {
  page: number;
};

const HomeBioPageContent = ({ page }: HomeBioPageItemProps) => {
  switch (page) {
    case 1:
      return <HomeBioPage1 />;
    case 2:
      return <HomeBioPage2 />;
    case 3:
      return <HomeBioPage3 />;
    default:
      return null;
  }
};

export default HomeBioPageContent;
