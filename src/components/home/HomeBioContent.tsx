import HomeBioPage1 from './contents/HomeBioPage1';
import HomeBioPage2 from './contents/HomeBioPage2';
import HomeBioPage3 from './contents/HomeBioPage3';
import { AnimatePresence, motion } from 'framer-motion';

type HomeBioPageItemProps = {
  page: number;
};

const HomeBioPageContent = ({ page }: HomeBioPageItemProps) => {
  const renderPage = () => {
    switch (page) {
      case 1:
        return <HomeBioPage1 key="page1" />;
      case 2:
        return <HomeBioPage2 key="page2" />;
      case 3:
        return <HomeBioPage3 key="page3" />;
      default:
        return null;
    }
  };

  {
    /* 화면 전환 애니메이션 */
  }
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full flex items-center justify-center"
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  );
};

export default HomeBioPageContent;
