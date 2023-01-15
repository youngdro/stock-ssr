import { useState } from "react";

interface UsePaginationProps {
  defaultPageSize?: number
}

const usePagination = (props: UsePaginationProps) => {
  const { defaultPageSize } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize || 10);
  const onChange = (i: number, size: number) => {
    setCurrent(i);
    setPageSize(size);
  };
  return { current, pageSize, onChange };
}

export default usePagination;