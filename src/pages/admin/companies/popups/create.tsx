import React, { useCallback, useState } from "react";
import { Modal, Row, Col } from "antd";
import "../../index.css";
import { useIntl } from "react-intl";
import styles from "../../style.module.css";
import TextBox from "../../../../shared/form-items/text-box";
import SelectBox from "../../../../shared/form-items/select-box";
import TextAreaBox from "../../../../shared/form-items/text-area-box";
import { ICompany } from "../../../../shared/services/admin/companies/dtos/company";

const CreateCompany = ({
  errors,
  visible,
  setVisible,
  handleCreate,
  loading,
}: any) => {
  const { messages } = useIntl();
  const [values, setValues] = useState<ICompany>({
    active: false,
    address: undefined,
    description: undefined,
    email: undefined,
    name: undefined,
    phone_number: undefined,
    social_media: undefined,
    points : undefined,
    section_id : undefined,

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
      okText={messages["Add"]}
      onOk={() => handleCreate(values)}
      title={messages["AddCompany"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Row justify={"center"} gutter={[8, 8]}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <div className={styles.field}>
            <TextBox
              label={messages["Email"]}
              dataField={"email"}
              required={true}
              error={errors["email"]}
              value={values["email"]}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.field}>
            <TextBox
              label={messages["PhoneNumber"]}
              dataField={"phone_number"}
              required={true}
              error={errors["phone_number"]}
              value={values["phone_number"]}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.field}>
            <TextBox
              label={messages["Address"]}
              dataField={"address"}
              value={values["address"]}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.field}>
            <TextBox
              label={messages["SocialMedia"]}
              dataField={"social_media"}
              value={values["social_media"]}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.field}>
            <TextBox
              label={'Points'}
              dataField={"points"}
              value={values["points"]}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.field}>
            <TextBox
              label={'Section'}
              dataField={"section_id"}
              value={values["section_id"]}
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col span={24}>
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

export default CreateCompany;
