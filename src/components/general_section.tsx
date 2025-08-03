type CideinContainerProps = {
  children: React.ReactNode;
};

function CideinContainer({ children }: CideinContainerProps) {
  return <div className="general_section">{children}</div>;
}

export default CideinContainer;
