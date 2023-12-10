import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Upload, Spin, Typography } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import Service from "../../../../shared/services/admin/mood";
import MainUtils from "../../../../shared/utils/main";
import { getToken } from "../../../../shared/utils/authorization";
import { useIntl } from "react-intl";

const UpdateMood = ({
  id,
  visible,
  setVisible,
  handleUpdate,
  loading,
  errors,
}: any) => {
  const { messages } = useIntl();
  const [fileList, setFileList] = useState<any>([]);
  const [values, setValues] = useState<any>({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      if (!MainUtils.isEmptyValue(id)) {
        setLoader(true);
        const dataMood: any = await Service.get(id);
        if (dataMood) {
          setValues({
            name: dataMood?.name,
            image_name: dataMood?.image_name,
            image: dataMood?.image,
          });
          setFileList([
            {
              uid: "1",
              name: dataMood?.image_name,
              status: "done",
              url: dataMood?.image,
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

  const handleChangeText = useCallback(
    ({ dataField, value }: any) => {
      setValues({ ...values, [dataField]: value });
    },
    [values]
  );

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
      title={messages["EditMood"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Spin spinning={loader}>
        <Row>
          <Col span={6}>
            <Row justify={"center"} align={"middle"} className={"fullHeight"}>
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
            <div>
              <TextBox
                label={messages["Name"]}
                dataField={"name"}
                required={true}
                error={errors["name"]}
                value={values["name"]}
                onChange={handleChangeText}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default UpdateMood;
