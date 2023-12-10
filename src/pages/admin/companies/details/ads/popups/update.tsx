import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Typography, Upload, Spin } from "antd";
import AppConsts from "../../../../../../constants/appconst";
import "../../../../index.css";
import TextBox from "../../../../../../shared/form-items/text-box";
import { getToken } from "../../../../../../shared/utils/authorization";
import styles from "../../../../style.module.css";
import { useIntl } from "react-intl";
import MainUtils from "../../../../../../shared/utils/main";
import Service from "../../../../../../shared/services/admin/ads";
import SelectBox from "../../../../../../shared/form-items/select-box";
import DatePicker from "../../../../../../shared/form-items/date-picker";
import TextAreaBox from "../../../../../../shared/form-items/text-area-box";

const UpdateBadges = ({
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
        const dataBadges: any = await Service.get(id);
        if (dataBadges) {
          setValues({
            name: dataBadges?.name,
            image_name: dataBadges?.image_name,
            image: dataBadges?.image,
            is_grand_master: dataBadges?.is_grand_master,
          });
          setFileList([
            {
              uid: "1",
              name: dataBadges?.image_name,
              status: "done",
              url: dataBadges?.image,
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
      title={messages["EditBadge"]}
      onCancel={() => setVisible(false)}
      cancelText={messages["Cancel"]}
      width={"50vw"}
      className={"customize-btn"}
      okButtonProps={{ loading: loading }}
    >
      <Spin spinning={loader}>
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
              label={messages["Title"]}
              dataField={"title"}
              required={true}
              error={errors["title"]}
              value={values["title"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <TextBox
              label={messages["Url"]}
              required={true}
              error={errors["url"]}
              dataField={"url"}
              value={values["url"]}
              onChange={handleChange}
            />
          </div>
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
          <div className={styles.field}>
            <DatePicker
              label={messages["StartsAt"]}
              dataField={"starts_at"}
              allowClear={false}
              value={values["starts_at"]}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.field}>
            <DatePicker
              label={messages["EndsAt"]}
              dataField={"ends_at"}
              allowClear={false}
              value={values["ends_at"]}
              onChange={handleChange}
            />
          </div>
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

export default UpdateBadges;
