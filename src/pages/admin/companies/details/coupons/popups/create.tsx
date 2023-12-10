import React, { useState, useCallback } from "react";
import { Col, Modal, Row } from "antd";
import "../../../../index.css";
import TextBox from "../../../../../../shared/form-items/text-box";
import styles from "../../../../style.module.css";
import SelectBox from "../../../../../../shared/form-items/select-box";
import { useIntl } from "react-intl";
import { ICoupons } from "../../../../../../shared/services/admin/coupons/dtos/coupons";
import TextAreaBox from "../../../../../../shared/form-items/text-area-box";
import DatePicker from "../../../../../../shared/form-items/date-picker";
import NumberBox from "../../../../../../shared/form-items/number-box";

const CreateAd = ({
  errors,
  visible,
  setVisible,
  handleCreate,
  loading,
}: any) => {
  const { messages } = useIntl();
  const [values, setValues] = useState<ICoupons>({
    active: false,
  });
  const statusOptions = [
    {
      id: false,
      name: messages["InActive"],
    },
    {
      id: true,
      name: messages["Active"],
    },
  ];

  const handleChange = useCallback(
    ({ dataField, value }: any) => {
      setValues({ ...values, [dataField]: value });
    },
    [values]
  );


  return (
    <Modal
      visible={visible}
      okText={messages["Coupon"]}
      onOk={() => handleCreate(values)}
      title={messages["AddAd"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Row justify={"center"} align={"middle"}>
        <Col span={24}>
          <div className={styles.field}>
            <TextBox
              label={messages["Name"]}
              dataField={"name"}
              required={true}
              error={errors["name"]}
              value={values["name"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <TextBox
              label={messages["Code"]}
              required={true}
              error={errors["code"]}
              dataField={"code"}
              value={values["code"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <TextBox
                label={messages["type"]}
              required={true}
              error={errors["type"]}
              dataField={"type"}
              value={values["type"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <NumberBox
              label={messages["Value"]}
              required={true}
              error={errors["value"]}
              dataField={"value"}
              value={values["value"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <NumberBox
              label={messages["MaxUses"]}
              required={true}
              error={errors["max_uses"]}
              dataField={"max_uses"}
              value={values["max_uses"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <SelectBox
              label={messages["Status"]}
              dataField={"active"}
              allowClear={false}
              value={values["active"]}
              onChange={handleChange}
              options={statusOptions}
            />
          </div>
          <div className={styles.field}>
            <DatePicker
              label={messages["StartsAt"]}
              dataField={"starts_at"}
              allowClear={false}
              value={values["starts_at"]}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <DatePicker
              label={messages["EndsAt"]}
              dataField={"ends_at"}
              allowClear={false}
              value={values["ends_at"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <TextAreaBox
              label={messages["Description"]}
              dataField={"description"}
              value={values["description"]}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateAd;
