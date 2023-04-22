interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = "" }) => {
  return <div className={`border-t  ${className}`} />;
};

export default Divider;
