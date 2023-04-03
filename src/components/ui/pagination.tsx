import RCPagination, { PaginationProps } from "rc-pagination";
// import "rc-pagination/index.css";

const Pagination: React.FC<PaginationProps> = (props) => {
  return <RCPagination {...props} />;
};

export default Pagination;
