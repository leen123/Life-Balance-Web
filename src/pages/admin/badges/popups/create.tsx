import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Typography, Upload } from "antd";
import AppConsts from "../../../../constants/appconst";
import "../../index.css";
import TextBox from "../../../../shared/form-items/text-box";
import { getToken } from "../../../../shared/utils/authorization";
import styles from "../../style.module.css";
import SelectBox from "../../../../shared/form-items/select-box";
import sectionsService from "../../../../shared/services/admin/section";
import NumberBox from "../../../../shared/form-items/number-box";
import CheckBox from "../../../../shared/form-items/check-box";
import { useIntl } from "react-intl";

const CreateBadge = ({
  errors,
  visible,
  setVisible,
  handleCreate,
  loading,
}: any) => {
  const { messages } = useIntl();
  const [fileList, setFileList] = useState<any>([]);
  const [sections, setSections] = useState<any>([]);
  const [values, setValues] = useState<any>({
    is_from_section: false,
    is_grand_master: false,
  });

  useEffect(() => {
    (async () => {
      let data: any = await sectionsService.getAll();
      if (data) setSections(data);
    })();
  }, []);

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
      title={messages["AddBadge"]}
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
              required={true}
              error={errors["points"]}
              dataField={"points"}
              value={values["points"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <SelectBox
              label={messages["Section"]}
              dataField={"section_id"}
              required={true}
              error={errors["section_id"]}
              value={values["section_id"]}
              onChange={handleChange}
              options={sections}
            />
          </div>
          <div className={styles.field}>
            <NumberBox
              label={messages["CountOfBadges"]}
              dataField={"count_of_badges"}
              value={values["count_of_badges"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <Row>
              <Col span={12}>
                <CheckBox
                  text={messages["IsFromSection"]}
                  dataField={"is_from_section"}
                  value={values["is_from_section"]}
                  onChange={handleChange}
                />
              </Col>
              <Col span={12}>
                <CheckBox
                  text={messages["IsGreatGrandMaster"]}
                  dataField={"is_grand_master"}
                  value={values["is_grand_master"]}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateBadge;
