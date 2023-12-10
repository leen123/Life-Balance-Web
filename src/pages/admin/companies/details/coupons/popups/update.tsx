import React, { useState, useCallback, useEffect } from "react";
import { Col, Modal, Row, Spin } from "antd";
import "../../../../index.css";
import TextBox from "../../../../../../shared/form-items/text-box";
import styles from "../../../../style.module.css";
import { useIntl } from "react-intl";
import MainUtils from "../../../../../../shared/utils/main";
import Service from "../../../../../../shared/services/admin/coupons";
import NumberBox from "../../../../../../shared/form-items/number-box";
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
          });
        }
        setLoader(false);
      }
    })();
  }, [id]);

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
        <Col span={24}>
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
            <TextBox
              label={messages["Type"]}
              required={true}
              error={errors["type"]}
              dataField={"type"}
              value={values["type"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <NumberBox
              label={messages["Value"]}
              required={true}
              error={errors["value"]}
              dataField={"value"}
              value={values["value"]}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <NumberBox
              label={messages["MaxUses"]}
              required={true}
              error={errors["max_uses"]}
              dataField={"max_uses"}
              value={values["max_uses"]}
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
