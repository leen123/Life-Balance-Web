import React from "react";
import styles from "./styles.module.css";
import { Row } from "antd";
import SVGIcon from "../../svg-icon";
import { useIntl } from "react-intl";

const PageNotFound = () => {
  const { messages } = useIntl();
  return (
    <div className={styles.container}>
      <Row justify={"center"} align={"middle"} className={styles.cardRow}>
        <div>
          <Row justify={"center"}>
            <SVGIcon name={"404page"} className={styles.svgPage} />
          </Row>
          <Row justify={"center"} className={styles.titleRow}>
            <div>
              <h1 className={styles.text404}>{['404Error']}</h1>
              <h1 className={styles.textError}>
                {messages["PageNotFound.text"]}.
              </h1>
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
};
export default PageNotFound;
