import React, { useState, useEffect } from "react";
import { Modal, Upload, Spin, Row, Col, Typography } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import Service from "../../../../shared/services/admin/image";
import MainUtils from "../../../../shared/utils/main";
import { getToken } from "../../../../shared/utils/authorization";
import { useIntl } from "react-intl";

const UpdateImage = ({
  id,
  errors,
  visible,
  setVisible,
  handleUpdate,
  loading,
}: any) => {
  const { messages } = useIntl();
  const [fileList, setFileList] = useState<any>([]);
  const [values, setValues] = useState<any>({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      if (!MainUtils.isEmptyValue(id)) {
        setLoader(true);
        const dataImage: any = await Service.get(id);
        if (dataImage) {
          setValues({
            image_name: dataImage?.image_name,
            image: dataImage?.image,
          });
          setFileList([
            {
              uid: "1",
              name: dataImage?.image_name,
              status: "done",
              url: dataImage?.image,
            },
          ]);
        }
        setLoader(false);
      }
    })();
  }, [id]);

  const handleChangeImage = (value: any) => {
    setFileList(value?.fileList);
    setValues({
      ...values,
      image_name: value?.fileList[0]?.response?.data?.fileName,
    });
  };

  const onOk = () => {
    let request = {
      ...values,
      image: values?.image_name,
    };
    delete request.image_name;
    handleUpdate(request);
  };

  return (
    <Modal
      visible={visible}
      okText={messages["Edit"]}
      onOk={onOk}
      title={messages["EditImage"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"25vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Spin spinning={loader}>
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
      </Spin>
    </Modal>
  );
};

export default UpdateImage;
