import classNames from "./style.module.css";
import React, { useCallback } from "react";
import { Checkbox, Typography } from "antd";

const CheckBox = ({
  dataField,
  value,
  error,
  text,
  onChange: doChange,
}: any) => {
  const handleChange = useCallback(
    ({ target }: any) => {
      doChange({ dataField, value: target.checked });
    },
    [dataField, doChange]
  );

  return (
    <div>
      <Checkbox
        className={classNames.input}
        checked={value || false}
        onChange={handleChange}
      >
        {text || ""}
      </Checkbox>
      <Typography.Text type="danger">{error}</Typography.Text>
    </div>
  );
};

export default CheckBox;
