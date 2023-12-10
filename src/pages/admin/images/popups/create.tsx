import React, { useState } from "react";
import { Modal, Upload, Row, Col, Typography } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import { getToken } from "../../../../shared/utils/authorization";
import { useIntl } from "react-intl";

const CreateImage = ({
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
    console.log(value)
    setFileList(value?.fileList);
    setValues({
      ...values,
      image: value?.fileList[0]?.response?.data?.fileName,
    });
  };

  return (
    <Modal
      visible={visible}
      okText={messages["Add"]}
      onOk={() => handleCreate(values)}
      title={messages["AddImage"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"25vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Row justify={"center"}>
        <Col>
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
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateImage;
