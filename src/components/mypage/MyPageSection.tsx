type MyPageSectionProps = {
  children: React.ReactNode;
  label: string;
};

const MyPageSection = ({ children, label }: MyPageSectionProps) => (
  <section className="w-full" aria-label={label}>
    {children}
  </section>
);

export default MyPageSection;
