import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Upload, Spin } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import TextAreaBox from "../../../../shared/form-items/text-area-box";
import MainUtils from "../../../../shared/utils/main";
import styles from "../../style.module.css";
import { getToken } from "../../../../shared/utils/authorization";
import { useIntl } from "react-intl";

const UpdateSections = ({
  dataSection,
  visible,
  setVisible,
  handleUpdate,
  loading,
}: any) => {
  const { messages } = useIntl();
  const [fileList, setFileList] = useState<any>([]);
  const [fileListIcon, setFileListIcon] = useState<any>([]);
  const [values, setValues] = useState<any>({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!MainUtils.isEmptyValue(dataSection)) {
      setLoader(true);
      if (dataSection) {
        setValues({
          name: dataSection?.name,
          code: dataSection?.code,
          description: dataSection?.description,
          image: dataSection?.image,
          icon: dataSection?.icon,
          image_name: dataSection?.image_name,
          icon_name: dataSection?.image_name,
        });
        setFileList([
          {
            uid: "1",
            name: dataSection?.image_name,
            status: "done",
            url: dataSection?.image,
          },
        ]);
        setFileListIcon([
          {
            uid: "1",
            name: dataSection?.icon_name,
            status: "done",
            url: dataSection?.icon,
          },
        ]);
      }
      setLoader(false);
    }
  }, [dataSection]);

  const handleChangeImage = (value: any) => {
    setFileList(value?.fileList);
    setValues({
      ...values,
      image_name: value?.fileList[0]?.response?.data?.fileName,
    });
  };

  const handleChangeIcon = (value: any) => {
    setFileListIcon(value?.fileList);
    setValues({
      ...values,
      icon_name: value?.fileList[0]?.response?.data?.fileName,
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
      icon: values?.icon_name,
    };
    delete request.image_name;
    delete request.icon_name;
    handleUpdate(request);
  };

  return (
    <Modal
      visible={visible}
      okText={messages["Edit"]}
      onOk={onOk}
      title={messages["EditSection"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Spin spinning={loader}>
        <Row>
          <Col span={6}>
            <Row
              justify={"center"}
              align={"middle"}
              className={styles.fullHeight}
            >
              <Col span={24}>
                <div>{messages["SectionImage"]}</div>
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
              </Col>
              <Col span={24}>
                <div>{messages["SectionIcon"]}</div>
                <Upload
                  fileList={fileListIcon}
                  className={"profile"}
                  multiple={false}
                  headers={{ authorization: "Bearer " + getToken() }}
                  action={AppConsts.remoteServiceUploadUrl}
                  listType="picture-card"
                  onChange={handleChangeIcon}
                >
                  {fileListIcon.length < 1 && messages["UploadIcon"]}
                </Upload>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <div className={styles.field}>
              <TextBox
                label={messages["Name"]}
                dataField={"name"}
                value={values["name"]}
                onChange={handleChangeText}
              />
            </div>
            <div className={styles.field}>
              <TextBox
                label={messages["Code"]}
                dataField={"code"}
                value={values["code"]}
                onChange={handleChangeText}
              />
            </div>
            <div>
              <TextAreaBox
                label={messages["Description"]}
                dataField={"description"}
                value={values["description"]}
                onChange={handleChangeText}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default UpdateSections;
