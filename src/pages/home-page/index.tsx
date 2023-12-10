import React from "react";
import styles from "./styles.module.css";
import "./styles.less";
import { Col, Row, Button, Layout } from "antd";
import mainUtils from "../../shared/utils/main";
import AppConsts from "../../constants/appconst";
import { ArrowRightOutlined } from "@ant-design/icons";
import { pages } from "../index";
import Logo from "../../shared/images/CirclopediaLogo.svg";
import { useLocaleContext } from "../../shared/contexts/app-context-provider/LocaleContextProvide";
import { useIntl } from "react-intl";

const HomePage = () => {
  const { messages } = useIntl();
  const { direction } = useLocaleContext();
  return (
    <div className={"homePage"}>
      <Layout>
        <Layout.Content className={styles.font}>
          <div
            className={
              direction === "ltr"
                ? styles.pluginContainer
                : styles.pluginContainerRtl
            }
          >
            <Row justify={"center"} className={styles.title}>
              <img className={styles.avatar} src={Logo} alt={"Logo"} />
            </Row>
            <Row align={"middle"} justify={"center"}>
              {!mainUtils.isEmptyValue(pages) &&
                pages.map((value: any) => (
                  <Col className={styles.container}>
                    <Row
                      justify={"center"}
                      onClick={() => {
                        window.location.href = `${AppConsts.publicUrl}/${value.code}`;
                      }}
                    >
                      <Col span={24}>
                        <Row justify={"center"}>
                          <img
                            className={styles.image}
                            src={value.icon}
                            alt={messages[value.name]?.toString()}
                          />
                          <div className={styles.middle}>
                            <Row justify={"center"}>
                              <Button
                                type="primary"
                                shape="circle"
                                onClick={() => {
                                  window.location.href = `${AppConsts.publicUrl}/${value.code}`;
                                }}
                                icon={<ArrowRightOutlined />}
                              />
                            </Row>
                          </div>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <h3 className={styles.pluginTitle}>{messages[value.name]}</h3>
                      </Col>
                    </Row>
                  </Col>
                ))}
            </Row>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
};
export default HomePage;
