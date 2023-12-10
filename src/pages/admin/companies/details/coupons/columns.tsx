import React, { Fragment } from "react";
import { Button, Col, Modal, Row, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const columns = (configs: any) => {
  return [
    {
      title: configs.messages["Image"],
      key: "image",
      render: (data: any) => (
        <Fragment>
          <img src={data?.image} width={50} height={50} alt={"imag"} />
        </Fragment>
      ),
    },
    {
      title: configs.messages["Title"],
      dataIndex: "title",
      key: "title",
    },
    {
      title: configs.messages["Url"],
      dataIndex: "url",
      key: "url",
    },
    {
      title: configs.messages["StartsAt"],
      dataIndex: "starts_at",
      key: "starts_at",
    },
    {
      title: configs.messages["EndsAt"],
      dataIndex: "ends_at",
      key: "ends_at",
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
