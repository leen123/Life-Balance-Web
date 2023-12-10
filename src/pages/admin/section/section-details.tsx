import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import useBreadcrumb from "../../../shared/hooks/use-breadcrumb";
import AppConsts from "../../../constants/appconst";
import Service from "../../../shared/services/admin/section";
import ServiceActivity from "../../../shared/services/admin/activity";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import MainUtils from "../../../shared/utils/main";
import styles from "../style.module.css";
import { PlusOutlined } from "@ant-design/icons";
import CreateActivity from "../activity/popups/create";
import { useIntl } from "react-intl";

const { Text } = Typography;

const SectionDetails = () => {
  const { messages } = useIntl();
  const [data, setData] = useState<any>({});
  const [loader, setLoader] = useState(true);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const { id } = useParams();
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([
      { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
      {
        text: messages["Sections"],
        url: `${AppConsts.publicUrl}/admin/sections`,
      },
      { render: <LoadingOutlined /> },
    ]);
    (async () => {
      const data: any = await Service.get(id);
      if (data) {
        setBreadcrumb([
          { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
          {
            text: messages["Sections"],
            url: `${AppConsts.publicUrl}/admin/sections`,
          },
          {
            text: `${data?.name}`,
            url: `${AppConsts.publicUrl}/admin/section/${id}`,
          },
        ]);
        setData(data);
      } else {
        setBreadcrumb([
          { text: messages["Admin"], url: `${AppConsts.publicUrl}/admin` },
          {
            text: messages["Sections"],
            url: `${AppConsts.publicUrl}/admin/sections`,
          },
          {
            text: id,
            url: `${AppConsts.publicUrl}/admin/section/${id}`,
          },
        ]);
      }
      setLoader(false);
    })();
  }, [id, setBreadcrumb, messages]);

  const handleCreate = async (values: any) => {
    setLoadingAdd(true);
    const res: any = await ServiceActivity.create(values);
    if (res) {
      setLoader(true);
      const dataSection: any = await Service.get(id);
      setData(dataSection);
      setLoader(false);
    }
    setLoadingAdd(false);
    setVisibleAdd(false);
  };

  return (
    <Spin spinning={loader}>
      <Row gutter={8}>
        <Col xs={24} sm={24} md={24} lg={17} xl={18}>
          <Card>
            <Skeleton loading={loader}>
              <Row className={styles.crudTitle}>
                <Col span={24}>
                  <h1>{messages["Section"] + ": " + data?.name}</h1>
                </Col>
              </Row>
              <Card
                title={messages["SectionActivities"]}
                extra={
                  <Tooltip title={messages["AddActivity"]}>
                    <Button
                      shape={"circle"}
                      type={"primary"}
                      icon={<PlusOutlined />}
                      onClick={() => setVisibleAdd(true)}
                    />
                  </Tooltip>
                }
              >
                <Row gutter={[16, 16]} justify={"center"}>
                  {!MainUtils.isEmptyValue(data?.activities) ? (
                    data?.activities?.map((activity: any, index: any) => (
                      <Col span={8} key={index}>
                        <Card hoverable className={styles.activityCard}>
                          <Row gutter={16}>
                            <Col>
                              <img
                                src={activity?.image}
                                alt={"activity"}
                                className={styles.activityImage}
                              />
                            </Col>
                            <Col>
                              <h3>{activity?.name}</h3>
                              <h5>{activity?.points + messages["Points"]}</h5>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Empty />
                  )}
                </Row>
              </Card>
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={7} xl={6}>
          <div
            className={styles.sectionImage}
            style={{ backgroundImage: `url(${data.image})` }}
          />
          <div className={"basicInfo"}>
            <div>
              <Text strong>{messages["Name"]}</Text>
            </div>
            <div>{data.name}</div>
          </div>
          <div className={"basicInfo"}>
            <div>
              <Text strong>{messages["Code"]}</Text>
            </div>
            <div>{data.code}</div>
          </div>
          <div className={"basicInfo"}>
            <div>
              <Text strong>{messages["Description"]}</Text>
            </div>
            <div>{data.description}</div>
          </div>
        </Col>
        {visibleAdd && (
          <CreateActivity
            visible={visibleAdd}
            setVisible={setVisibleAdd}
            handleCreate={handleCreate}
            loading={loadingAdd}
            fromSection={true}
            sectionId={data?.id}
          />
        )}
      </Row>
    </Spin>
  );
};

export default SectionDetails;
