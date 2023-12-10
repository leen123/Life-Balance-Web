import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Row, Skeleton, Table } from "antd";
import { columns } from "./columns";
import UpdateCoupons from "./popups/update";
import CreateCoupons from "./popups/create";
import { useHistory } from "react-router";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Service from "../../../../../shared/services/admin/coupons";
import MainUtils from "../../../../../shared/utils/main";
import styles from "../../../style.module.css";
import { validate } from "../../../../../shared/utils/validation";
import { schema, schemaUpdate } from "./popups/schema";
import { useIntl } from "react-intl";

const Coupons = ({companyId}: any) => {
  const { messages } = useIntl();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState();
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const deleteConfig: any = (id: any) => {
    return {
      okText: messages["Delete"],
      cancelText: messages["Cancel"],
      title: messages["Confirmation.Delete.Coupon"],
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        if (!MainUtils.isEmptyValue(id)) {
          setLoadingDelete(true);
          const res: any = await Service.delete(id);
          if (res) {
            setLoader(true);
            const dataCoupons: any = await Service.getAll();
            setData(dataCoupons);
            setLoader(false);
          }
          setLoadingDelete(false);
        }
      },
      onCancel() {},
      okButtonProps: { loading: loadingDelete, danger: true },
      content: <Fragment />,
    };
  };

  const handleCreate = async (values: any) => {
    const err: any = await validate(schema(messages), values);
    if (!MainUtils.isEmptyObject(err)) {
      setErrors(err);
    } else {
      setErrors({});
      setLoadingAdd(true);
      const res: any = await Service.create({...values, company_id: companyId});
      if (res) {
        setLoader(true);
        const dataCoupons: any = await Service.getAll();
        setData(dataCoupons);
        setLoader(false);
      }
      setLoadingAdd(false);
      setVisibleAdd(false);
    }
  };

  const handleUpdate = async (values: any) => {
    const err: any = await validate(schemaUpdate(messages), values);
    if (!MainUtils.isEmptyObject(err)) {
      setErrors(err);
    } else {
      setErrors({});
      setLoadingEdit(true);
      const res: any = await Service.update(id, {...values, company_id: companyId});
      if (res) {
        setLoader(true);
        const data: any = await Service.getAll();
        setData(data);
        setLoader(false);
      }
      setLoadingEdit(false);
      setVisibleEdit(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      const dataCoupons: any = await Service.getAll();
      setData(dataCoupons);
      setLoader(false);
    })();
  }, []);

  return (
    <Fragment>
      <Card>
        <Skeleton loading={loader}>
          <Row justify={"space-between"} className={styles.crudTitle}>
            <h1>Coupons</h1>
            <Button
              type={"primary"}
              shape={"circle"}
              icon={<PlusOutlined />}
              onClick={() => setVisibleAdd(true)}
            />
          </Row>
          <Table
            dataSource={data}
            columns={columns({
              deleteConfig,
              setVisibleEdit,
              history,
              setId,
              messages,
            })}
          />
        </Skeleton>
      </Card>
      {visibleEdit && (
        <UpdateCoupons
          id={id}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          handleUpdate={handleUpdate}
          loading={loadingEdit}
          errors={errors}
        />
      )}
      {visibleAdd && (
        <CreateCoupons
          visible={visibleAdd}
          setVisible={setVisibleAdd}
          handleCreate={handleCreate}
          loading={loadingAdd}
          errors={errors}
        />
      )}
    </Fragment>
  );
};

export default Coupons;
