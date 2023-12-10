import classNames from "./style.module.css";
import React, { useCallback } from "react";
import { Input, Typography } from "antd";

const TextBox = ({
  label,
  value,
  error,
  dataField,
  required,
  placeHolder,
  onChange: doChange,
}: any) => {
  const handleChange = useCallback(
    ({ target }: any) => {
      doChange({ dataField, value: target.value });
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
        <Input
          value={value || ""}
          placeholder={placeHolder || null}
          onChange={handleChange}
        />
        <Typography.Text type="danger">{error}</Typography.Text>
      </div>
    </div>
  );
};

export default TextBox;
