import React, { Fragment } from "react";
import { Button, Col, Modal, Row, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "../style.module.css";
const { confirm } = Modal;

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
      title: configs.messages["Points"],
      dataIndex: "points",
      key: "points",
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
                  configs.setId(data.id);
                }}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title={configs.messages["Delete"]}>
              <Button
                type={"primary"}
                danger
                icon={<DeleteOutlined />}
                shape={"circle"}
                size={"small"}
                onClick={() => {
                  confirm(configs.deleteConfig(data.id));
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];
};
