type DashboardSectionProps = {
  children: React.ReactNode;
  label: string;
};

const DashboardSection = ({ children, label }: DashboardSectionProps) => (
  <section className="w-full" aria-label={label}>
    {children}
  </section>
);

export default DashboardSection;
