import classNames from "./style.module.css";
import React, { useCallback } from "react";
import { InputNumber, Typography } from "antd";

const NumberBox = ({
  min,
  max,
  label,
  value,
  error,
  dataField,
  required,
  placeHolder,
  onChange: doChange,
}: any) => {
  const handleChange = useCallback(
    (value: any) => {
      doChange({ dataField, value: value });
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
        <InputNumber
          value={value || undefined}
          className={"fullWidth"}
          placeholder={placeHolder || null}
          onChange={handleChange}
          min={min ? min : 0}
          max={max ? max : undefined}
        />
        <Typography.Text type="danger">{error}</Typography.Text>
      </div>
    </div>
  );
};

export default NumberBox;
