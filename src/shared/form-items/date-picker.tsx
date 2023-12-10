import classNames from "./style.module.css";
import React, { useCallback } from "react";
import { DatePicker as AntdDatePicker, Typography } from "antd";

const DatePicker = ({
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
      console.log({ value });
      // doChange({ dataField, value: value });
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
        <AntdDatePicker
          value={value || undefined}
          className={"fullWidth"}
          placeholder={placeHolder || null}
          onChange={handleChange}
        />
        <Typography.Text type="danger">{error}</Typography.Text>
      </div>
    </div>
  );
};

export default DatePicker;
