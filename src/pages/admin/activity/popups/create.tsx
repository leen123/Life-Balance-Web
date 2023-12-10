import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Typography, Upload } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import styles from "../../style.module.css";
import SelectBox from "../../../../shared/form-items/select-box";
import Service from "../../../../shared/services/admin/section";
import { getToken } from "../../../../shared/utils/authorization";
import MainUtils from "../../../../shared/utils/main";
import NumberBox from "../../../../shared/form-items/number-box";
import { useIntl } from "react-intl";

const CreateActivity = ({
  errors,
  visible,
  setVisible,
  handleCreate,
  loading,
  fromSection,
  sectionId,
}: any) => {
  const { messages } = useIntl();
  const [fileList, setFileList] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [values, setValues] = useState<any>({});

  useEffect(() => {
    (async () => {
      let data: any = await Service.getAll();
      if (data) setOptions(data);
    })();
  }, []);

  useEffect(() => {
    if (!MainUtils.isEmptyValue(sectionId)) {
      setValues({ section_id: sectionId });
    }
  }, [sectionId]);

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
      title={messages["AddActivity"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Row>
        <Col span={6}>
          <Row
            justify={"center"}
            align={"middle"}
            className={styles.fullHeight}
          >
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
          {!fromSection && (
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
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateActivity;
