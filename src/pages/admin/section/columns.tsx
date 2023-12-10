import React, { Fragment } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styles from "../style.module.css";

export const columns = (configs: any) => {
  return [
    {
      title: configs.messages["Image"],
      key: "image",
      render: (data: any) => (
        <Fragment>
          <img
            src={data?.image}
            width={50}
            height={50}
            alt={"imag"}
            className={styles.imageTable}
          />
        </Fragment>
      ),
    },
    {
      title: configs.messages["Name"],
      dataIndex: "name",
      key: "name",
    },
    {
      title: configs.messages["Code"],
      dataIndex: "code",
      key: "code",
    },
    {
      title: configs.messages["Description"],
      dataIndex: "description",
      key: "description",
    },
    {
      width: "90px",
      title: configs.messages["Actions"],
      key: "action",
      render: (data: any) => (
        <Row justify={"space-between"}>
          <Col>
            <Tooltip title={configs.messages["Edit"]}>
              <Button
                type={"primary"}
                icon={<EditOutlined />}
                shape={"circle"}
                size={"small"}
                onClick={() => {
                  configs.setVisibleEdit(true);
                  configs.setRowData(data);
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];
};
