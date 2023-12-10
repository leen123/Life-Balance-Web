import React, { Fragment, useEffect, useState } from "react";
import useBreadcrumb from "../../../shared/hooks/use-breadcrumb";
import AppConsts from "../../../constants/appconst";
import { Button, Card, Row, Skeleton, Table } from "antd";
import { columns } from "./columns";
import UpdateReward from "./popups/update";
import CreateReward from "./popups/create";
import { useHistory } from "react-router";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Service from "../../../shared/services/admin/coupons";
import MainUtils from "../../../shared/utils/main";
import styles from "../style.module.css";
import { validate } from "../../../shared/utils/validation";
import { schema } from "./popups/schema";
import { useIntl } from "react-intl";
import CreateAd from "../companies/details/coupons/popups/create";

const Reward = () => {
  const { messages } = useIntl();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState();
  const [errors, setErrors] = useState({});
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const history = useHistory();

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
      {
        text: messages["Rewards"],
        url: `${AppConsts.publicUrl}/admin/rewards`,
      },
    ]);
  }, [setBreadcrumb, messages]);

  const deleteConfig: any = (id: any) => {
    return {
      okText: messages["Delete"],
      cancelText: messages["Cancel"],
      title: messages["Confirmation.Delete.Reward"],
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        if (!MainUtils.isEmptyValue(id)) {
          setLoadingDelete(true);
          const res: any = await Service.delete(id);
          if (res) {
            setLoader(true);
            const dataReward: any = await Service.getAll();
            setData(dataReward);
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
 
      setLoadingAdd(true);
      const res: any = await Service.create({...values,ar_name:"no ar",type:"fixed",points_:50,starts_at:"2023-08-14",company_id:1});
      if (res) {
        setLoader(true);
        const dataReward: any = await Service.getAll();
        setData(dataReward);
        setLoader(false);
      }
      setLoadingAdd(false);
      setVisibleAdd(false);
    
  };

  const handleUpdate = async (values: any) => {
    const err: any = await validate(schema(messages), values);
    if (!MainUtils.isEmptyObject(err)) {
      setErrors(err);
    } else {
      setErrors({});
      setLoadingEdit(true);
      const res: any = await Service.update(id, values);
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
      const dataReward: any = await Service.getAll();
      setData(dataReward);
      setLoader(false);
    })();
  }, []);

  return (
    <Fragment>
      <Card>
        <Skeleton loading={loader}>
          <Row justify={"space-between"} className={styles.crudTitle}>
            <h1>{messages["Coupons"]}</h1>
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
        <UpdateReward
          id={id}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          handleUpdate={handleUpdate}
          loading={loadingEdit}
          errors={errors}
        />
      )}
      {visibleAdd && (
        <CreateAd
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

export default Reward;
