import React, { useState } from "react";
import { Input } from "antd";
import { Container } from "./styled";

interface StockFilterProps {
  onSearch?: (searchValue: string) => void;
}

export const StockFilter: React.FC<StockFilterProps> = (props) => {
  const { onSearch } = props;
  const [, setSearchValue] = useState("");

  const handleSearch = (val) => {
    setSearchValue(val);
    onSearch && onSearch(val);
  };

  const renderSearchInput = () => {
    return (
      <Input.Search
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={handleSearch}
        style={{ width: 220 }}
      />
    );
  };

  return (
    <Container>
      {renderSearchInput()}
    </Container>
  );
};

export default StockFilter;
