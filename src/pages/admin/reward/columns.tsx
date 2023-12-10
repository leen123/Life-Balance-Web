import React, { Fragment } from "react";
import { Button, Col, Modal, Row, Tooltip } from "antd";
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
      title: configs.messages["Name"],
      dataIndex: "name",
      key: "name",
    },
      {
      title: configs.messages["QR"],
      key: "QR",
      render: (data: any) => (
        <Fragment>
          <a href="/path/to/image" download={"QR"}>
            <img src={data?.QR} width={50} height={50} alt={"QR"} />
          </a>
     
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
