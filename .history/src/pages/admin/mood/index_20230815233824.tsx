import React, { Fragment, useEffect, useState } from "react";
import useBreadcrumb from "../../../shared/hooks/use-breadcrumb";
import AppConsts from "../../../constants/appconst";
import { Button, Card, Row, Skeleton, Table } from "antd";
import { columns } from "./columns";
import UpdateMood from "./popups/update";
import CreateMood from "./popups/create";
import { useHistory } from "react-router";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Service from "../../../shared/services/admin/mood";
import MainUtils from "../../../shared/utils/main";
import styles from "../style.module.css";
import { validate } from "../../../shared/utils/validation";
import { schema } from "./popups/schema";
import { useIntl } from "react-intl";

const Mood = () => {
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

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
      { text: messages["Moods"], url: `${AppConsts.publicUrl}/admin/moods` },
    ]);
  }, [setBreadcrumb, messages]);

  const deleteConfig: any = (id: any) => {
    return {
      okText: messages["Delete"],
      cancelText: messages["Cancel"],
      title: messages["Confirmation.Delete.Mood"],
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        if (!MainUtils.isEmptyValue(id)) {
          setLoadingDelete(true);
          const res: any = await Service.delete(id);
          if (res) {
            setLoader(true);
            const dataMood: any = await Service.getAll();
            setData(dataMood);
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

      const res: any = await Service.create(values);
      if (res) {
        setLoader(true);
        const dataMood: any = await Service.getAll();
        setData(dataMood);
        setLoader(false);
      }
     

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
      const dataMood: any = await Service.getAll();
      setData(dataMood);
      setLoader(false);
    })();
  }, []);

  return (
    <Fragment>
      <Card>
        <Skeleton loading={loader}>
          <Row justify={"space-between"} className={styles.crudTitle}>
            <h1>{messages["Moods"]}</h1>
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
        <UpdateMood
          id={id}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          handleUpdate={handleUpdate}
          loading={loadingEdit}
          errors={errors}
        />
      )}
      {visibleAdd && (
        <CreateMood
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

export default Mood;
