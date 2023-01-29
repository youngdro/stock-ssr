import React, { useState } from "react";
import { Select, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { ICurrentStock } from "../../api/stock/tools/interface";
import { FieldsNameEnum } from "../../api/stock/tools/common/config";
import { UseSortProps } from "../../hooks/interface";

type SortKeyType = keyof ICurrentStock;
type SortOrderType = "asc" | "desc";

interface StockSorterProps {
  onSort?: (options: Omit<UseSortProps<ICurrentStock>, "list">) => void;
}

export const StockSorter: React.FC<StockSorterProps> = (props) => {
  const { onSort } = props;
  const [sortKey, setSortKey] = useState<SortKeyType>("pctChg");
  const [order, setOrder] = useState<SortOrderType>("desc");
  const sortFields = ["pctChg", "turn", "trade", "volume", "amount"];
  const sortOptions = sortFields.map((value) => ({
    label: FieldsNameEnum[value],
    value,
  }));
  const orderOptions = [
    { label: "倒序", value: "desc" },
    { label: "正序", value: "asc" },
  ];
  const onSortOptionChange = (value) => {
    setSortKey(value);
    onSort && onSort({ sortKey: value, order });
  };

  const onSortOrderChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setOrder(value);
    onSort && onSort({ sortKey, order: value });
  };
  return (
    <span>
      <Select
        value={sortKey}
        options={sortOptions}
        style={{ width: 120, marginLeft: 16 }}
        onChange={onSortOptionChange}
      />
      <Radio.Group
        value={order}
        options={orderOptions}
        style={{ marginLeft: 16 }}
        onChange={onSortOrderChange}
      />
    </span>
  );
};

export default StockSorter;
