import React, { useState, useCallback } from "react";
import { Col, Modal, Row, Typography, Upload } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import { getToken } from "../../../../shared/utils/authorization";
import styles from "../../style.module.css";
import NumberBox from "../../../../shared/form-items/number-box";
import { useIntl } from "react-intl";

const CreateReward = ({
  errors,
  visible,
  setVisible,
  handleCreate,
  loading,
}: any) => {
  const { messages } = useIntl();
  const [fileList, setFileList] = useState<any>([]);
  const [values, setValues] = useState<any>({});

  const handleChangeImage = (value: any) => {
    setFileList(value?.fileList);
    setValues({
      ...values,
      image: value?.fileList[0]?.response?.data?.fileName,
    });
  };

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
      title={messages["AddReward"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Row justify={"center"} align={"middle"}>
        <Col span={6}>
          <Row className={"fullHeight"}>
            <Upload
              fileList={fileList}
              className={"profile"}
              multiple={false}
              headers={{ authorization: "Bearer " + getToken() }}
              action={AppConsts.remoteServiceUploadUrl}
              listType="picture-card"
              onChange={handleChangeImage}
            >
              {fileList.length < 1 && messages["UploadImage"]}
            </Upload>
            <Typography.Text type="danger">{errors["image"]}</Typography.Text>
          </Row>
        </Col>
        <Col span={18}>
          <div className={styles.field}>
            <TextBox
              label={messages["Name"]}
              required={true}
              error={errors["name"]}
              dataField={"name"}
              value={values["name"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <TextBox
              label={messages["Code"]}
              required={true}
              dataField={"code"}
              value={values["code"]}
              error={errors["code"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <NumberBox
              label={messages["QuantityPoints"]}
              required={true}
              dataField={"quantity_points"}
              value={values["quantity_points"]}
              error={errors["quantity_points"]}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateReward;
