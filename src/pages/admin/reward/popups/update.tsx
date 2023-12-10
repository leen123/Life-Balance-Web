import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Upload, Spin, Typography } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import Service from "../../../../shared/services/admin/reward";
import MainUtils from "../../../../shared/utils/main";
import { getToken } from "../../../../shared/utils/authorization";
import styles from "../../style.module.css";
import NumberBox from "../../../../shared/form-items/number-box";
import { useIntl } from "react-intl";

const UpdateReward = ({
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
        const dataReward: any = await Service.get(id);
        if (dataReward) {
          setValues({
            name: dataReward?.name,
            code: dataReward?.code,
            quantity_points: dataReward?.quantity_points,
            image: dataReward?.image,
            image_name: dataReward?.image_name,
          });
          setFileList([
            {
              uid: "1",
              name: dataReward?.image_name,
              status: "done",
              url: dataReward?.image,
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

  const handleChange = useCallback(
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
      title={messages["EditReward"]}
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
                error={errors["code"]}
                dataField={"code"}
                value={values["code"]}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <NumberBox
                label={messages["QuantityPoints"]}
                required={true}
                error={errors["quantity_points"]}
                dataField={"quantity_points"}
                value={values["quantity_points"]}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default UpdateReward;
