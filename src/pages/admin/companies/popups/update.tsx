import React, { useState, useEffect, useCallback } from "react";
import { Modal, Spin, Row, Col } from "antd";
import "../../index.css";
import Service from "../../../../shared/services/admin/companies";
import MainUtils from "../../../../shared/utils/main";
import { useIntl } from "react-intl";
import styles from "../../style.module.css";
import TextBox from "../../../../shared/form-items/text-box";
import SelectBox from "../../../../shared/form-items/select-box";
import TextAreaBox from "../../../../shared/form-items/text-area-box";
import { ICompany } from "../../../../shared/services/admin/companies/dtos/company";

const UpdateCompany = ({
  id,
  errors,
  visible,
  setVisible,
  handleUpdate,
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
  const [loader, setLoader] = useState(true);
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
  useEffect(() => {
    (async () => {
      if (!MainUtils.isEmptyValue(id)) {
        setLoader(true);
        const dataCompany: any = await Service.get(id);
        if (dataCompany) {
          setValues(dataCompany);
        }
        setLoader(false);
      }
    })();
  }, [id]);

  const handleChange = useCallback(
    ({ dataField, value }: any) => {
      setValues({ ...values, [dataField]: value });
    },
    [values]
  );

  return (
    <Modal
      visible={visible}
      okText={messages["Edit"]}
      onOk={() => handleUpdate(values)}
      title={messages["EditCompany"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Spin spinning={loader}>
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
      </Spin>
    </Modal>
  );
};

export default UpdateCompany;
