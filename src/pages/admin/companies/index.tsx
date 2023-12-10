import React, { Fragment, useEffect, useState } from "react";
import useBreadcrumb from "../../../shared/hooks/use-breadcrumb";
import AppConsts from "../../../constants/appconst";
import { Button, Card, Row, Skeleton, Table } from "antd";
import { useHistory } from "react-router";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { columns } from "./columns";
import Service from "../../../shared/services/admin/companies";
import UpdateCompany from "./popups/update";
import CreateCompany from "./popups/create";
import MainUtils from "../../../shared/utils/main";
import styles from "../style.module.css";
import { validate } from "../../../shared/utils/validation";
import { schema } from "./popups/schema";
import { useIntl } from "react-intl";
import { ICompany } from "../../../shared/services/admin/companies/dtos/company";

const Companies = () => {
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
      {
        text: messages["Companies"],
        url: `${AppConsts.publicUrl}/admin/companies`,
      },
    ]);
  }, [setBreadcrumb, messages]);

  const deleteConfig: any = (id: any) => {
    return {
      okButtonProps: { loading: loadingDelete, danger: true },
      okText: messages["Delete"],
      cancelText: messages["Cancel"],
      title: messages["Confirmation.Delete.Company"],
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        if (!MainUtils.isEmptyValue(id)) {
          setLoadingDelete(true);
          const res: any = await Service.delete(id);
          if (res) {
            setLoader(true);
            const dataCompany: any = await Service.getAll();
            setData(dataCompany);
            setLoader(false);
          }
          setLoadingDelete(false);
        }
      },
      onCancel() {},
      content: <Fragment />,
    };
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      const dataCompany: any = await Service.getAll();
      setData(dataCompany);
      setLoader(false);
    })();
  }, []);

  const handleCreate = async (values: ICompany) => {
    const err: any = await validate(schema(messages), values);
    if (!MainUtils.isEmptyObject(err)) {
      setErrors(err);
    } else {
      setErrors({});
      setLoadingAdd(true);
      const res: any = await Service.create(values);
      if (res) {
        setLoader(true);
        const dataCompany: any = await Service.getAll();
        setData(dataCompany);
        setLoader(false);
      }
      setLoadingAdd(false);
      setVisibleAdd(false);
    }
  };

  const handleUpdate = async (values: ICompany) => {
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

  return (
    <Fragment>
      <Card>
        <Skeleton loading={loader}>
          <Row justify={"space-between"} className={styles.crudTitle}>
            <h1>{messages["Companies"]}</h1>
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
        <UpdateCompany
          id={id}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          handleUpdate={handleUpdate}
          loading={loadingEdit}
          errors={errors}
        />
      )}
      {visibleAdd && (
        <CreateCompany
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

export default Companies;
