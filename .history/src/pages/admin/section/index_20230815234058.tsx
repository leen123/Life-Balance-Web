import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Skeleton, Table ,Button} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import useBreadcrumb from "../../../shared/hooks/use-breadcrumb";
import AppConsts from "../../../constants/appconst";
import { columns } from "./columns";
import Service from "../../../shared/services/admin/section";
import { useHistory } from "react-router";
import UpdateSections from "./popups/update";
import styles from "../style.module.css";
import { useIntl } from "react-intl";
import CreateSections from "./popups/create";

const Sections = () => {
  const { messages } = useIntl();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [rowData, setRowData] = useState<any>();
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const history = useHistory();

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
      {
        text: messages["Sections"],
        url: `${AppConsts.publicUrl}/admin/sections`,
      },
    ]);
  }, [setBreadcrumb, messages]);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const dataSection: any = await Service.getAll();
      setData(dataSection);
      setLoader(false);
    })();
  }, []);

  const handleCreate = async (values: any) => {
    setLoadingEdit(true);
    const res: any = await Service.create(values);
    if (res) {
      setLoader(true);
      const dataSection: any = await Service.getAll();
      setData(dataSection);
      setLoader(false);
    }
    setLoadingEdit(false);
    setVisibleEdit(false);
  };

  const handleUpdate = async (values: any) => {
    setLoadingEdit(true);
    const res: any = await Service.update(rowData?.id, values);
    if (res) {
      setLoader(true);
      const dataSection: any = await Service.getAll();
      setData(dataSection);
      setLoader(false);
    }
    setLoadingEdit(false);
    setVisibleEdit(false);
  };

  return (
    <Fragment>
      <Card>
        <Skeleton loading={loader}>
               <Row justify={"space-between"} className={styles.crudTitle}>
            <h1>{messages["Sections"]}</h1>
            <Button
              type={"primary"}
              shape={"circle"}
              icon={<PlusOutlined />}
              onClick={() => setVisibleCreate(true)}
            />
          </Row>
        

          <Table
            dataSource={data}
            columns={columns({ setVisibleEdit, history, setRowData, messages })}
          />
        </Skeleton>
      </Card>
      {visibleEdit && (
        <UpdateSections
          dataSection={rowData}
          visible={visibleEdit}
          setVisible={setVisibleEdit}
          handleUpdate={handleUpdate}
          loading={loadingEdit}
        />
      )}

       {visibleCreate && (
        <CreateSections
          visible={visibleCreate}
          setVisible={setVisibleCreate}
          handleUpdate={handleCreate}
 
      
        />
      )}
    </Fragment>
  );
};

export default Sections;
