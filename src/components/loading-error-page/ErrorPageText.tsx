import React from 'react';
import Title from '../common/Title';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';
import LinkButton from '../common/button/LinkButton';
import { PATH } from '@/constants/path.constants';

type ErrorPageTextProps = {
  contents: {
    title: string;
    text: string;
    href: string;
    linkButtonText: string;
  };
};

const ErrorPageText = ({ contents }: ErrorPageTextProps) => {
  const { title, text, href, linkButtonText } = contents;
  return (
    <section className="flex flex-col gap-1 items-center">
      <Title mode={TITLE_MODE.SECTION_TITLE}>{title}</Title>
      <Text>{text}</Text>
      <br />

      <LinkButton mode={LINKBUTTON_MODE.COMMON} href={href}>
        {linkButtonText}
      </LinkButton>
    </section>
  );
};

export default ErrorPageText;
