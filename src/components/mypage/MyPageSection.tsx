type MyPageSectionProps = {
  children: React.ReactNode;
};

const MyPageSection = ({ children }: MyPageSectionProps) => {
  return <section className="w-full max-w-[680px]">{children}</section>;
};

export default MyPageSection;
