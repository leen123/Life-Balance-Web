import React from "react";
import { BounceLoader } from "react-spinners";
import { Col, Row } from "antd";
import styles from "./styles.module.css";
import AppConsts from "../../../constants/appconst";
import { useIntl } from "react-intl";
const Loader = () => {
  const { messages } = useIntl();
  return (
    <Row className={styles.centerLoader}>
      <Col span={24}>
        <Row justify={"center"}>
          <BounceLoader color={AppConsts.primaryColor} size={180} />
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"}>
          <h1 style={{ color: AppConsts.primaryColor }}>{messages["PleaseWait"]}</h1>
        </Row>
      </Col>
    </Row>
  );
};

export default Loader;
