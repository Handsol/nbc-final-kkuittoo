type TextProps = {
  children: string;
};

const Title = ({ children }: TextProps) => {
  return <p>{children}</p>;
};

export default Title;
