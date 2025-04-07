import { TITLE_MODE } from '@/constants/mode.constants';

type TitleProps = {
  mode: number;
  children: string;
};

const Title = ({ mode, children }: TitleProps) => {
  switch (mode) {
    case TITLE_MODE.LOGO:
      return <h1>{children}</h1>;
    case TITLE_MODE.LINK:
      return <h2>{children}</h2>;
    case TITLE_MODE.SECTION_TITLE:
      return <h3>{children}</h3>;
    case TITLE_MODE.SECTION_SUBTITLE:
      return <h4>{children}</h4>;
    default:
      return <span>{children}</span>; // fallback
  }
};

export default Title;
