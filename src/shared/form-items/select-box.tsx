import classNames from "./style.module.css";
import React, { useCallback } from "react";
import { Select, Typography } from "antd";
import MainUtils from "../utils/main";

const SelectBox = ({
  label,
  value,
  error,
  options,
  dataField,
  valueExpr,
  required,
  placeHolder,
  displayExpr,
  onChange: doChange,
  allowClear = true,
}: any) => {
  const handleChange = useCallback(
    (value: any) => {
      doChange({ dataField, value });
    },
    [dataField, doChange]
  );

  return (
    <div className={classNames.itemContainer}>
      <div className={classNames.label}>
        {label}
        {required ? <span className={classNames.redStar}> *</span> : null}
      </div>
      <div className={classNames.input}>
        <Select
          allowClear={allowClear}
          value={!MainUtils.isEmptyValue(value) ? value : " "}
          placeholder={placeHolder}
          onChange={handleChange}
        >
          {options?.map((data: any, index: any) => (
            <Select.Option key={index} value={data?.[valueExpr] || data.id}>
              {data?.[displayExpr] || data.name}
            </Select.Option>
          ))}
        </Select>
        <Typography.Text type="danger">{error}</Typography.Text>
      </div>
    </div>
  );
};

export default SelectBox;
