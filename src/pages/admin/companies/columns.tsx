import React, { Fragment } from "react";
import { Button, Col, Modal, Row, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
const { confirm } = Modal;

export const columns = (configs: any) => {
  return [
    {
      title: configs.messages["Name"],
      dataIndex: "name",
      key: "name",
    },
    {
      title: configs.messages["Email"],
      dataIndex: "email",
      key: "email",
    },
    {
      title: configs.messages["PhoneNumber"],
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: configs.messages["Address"],
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Section",
      dataIndex: "section_id",
      key: "section_id",
    },
    {
      title: configs.messages["Status"],
      dataIndex: "active",
      key: "active",
      render: (text: any, record: any) => (
        <Fragment>
          {record?.active ? (
            <Tag color={"#009174"}>{configs.messages["Active"]}</Tag>
          ) : (
            <Tag color={"#7b7b7b"}>{configs.messages["InActive"]}</Tag>
          )}
        </Fragment>
      ),
    },
    {
      width: "135px",
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
