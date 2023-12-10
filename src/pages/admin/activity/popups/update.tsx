import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Upload, Spin, Typography } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import Service from "../../../../shared/services/admin/activity";
import ServiceSection from "../../../../shared/services/admin/section";
import MainUtils from "../../../../shared/utils/main";
import styles from "../../style.module.css";
import SelectBox from "../../../../shared/form-items/select-box";
import { getToken } from "../../../../shared/utils/authorization";
import NumberBox from "../../../../shared/form-items/number-box";
import { useIntl } from "react-intl";

const UpdateActivity = ({
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
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let data: any = await ServiceSection.getAll();
      if (data) setOptions(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!MainUtils.isEmptyValue(id)) {
        setLoader(true);
        const dataActivity: any = await Service.get(id);
        if (dataActivity) {
          setValues({
            name: dataActivity?.name,
            points: dataActivity?.points,
            section_id: dataActivity?.section_id,
            image_name: dataActivity?.image_name,
            image: dataActivity?.image,
          });
          setFileList([
            {
              uid: "1",
              name: dataActivity?.image_name,
              status: "done",
              url: dataActivity?.image,
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
      title={messages["EditActivity"]}
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
                dataField={"name"}
                required={true}
                error={errors["name"]}
                value={values["name"]}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <NumberBox
                label={messages["Points"]}
                dataField={"points"}
                required={true}
                error={errors["points"]}
                value={values["points"]}
                onChange={handleChange}
              />
            </div>
            <div>
              <SelectBox
                label={messages["Section"]}
                dataField={"section_id"}
                required={true}
                error={errors["section_id"]}
                value={values["section_id"]}
                onChange={handleChange}
                options={options}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default UpdateActivity;
