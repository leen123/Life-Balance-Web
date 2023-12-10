import React from "react";
import { Col, Row } from "antd";
import Breadcrumb from "../breadcrumb";
import Desktop from "./display-method/desktop";
import "./index.less";
import styles from "./styles.module.css";
import MainUtils from "../../../../shared/utils/main";
import { useLocaleContext } from "../../../../shared/contexts/app-context-provider/LocaleContextProvide";
import CollapsedIcon from "../../../../shared/custom-ant-icons/collapsed-icon";
import UnCollapsedIcon from "../../../../shared/custom-ant-icons/un-collapsed-icon";

const Header = ({ collapsed, setCollapsed, configs }: any) => {
  const { direction } = useLocaleContext();
    const { themeMode } = useLocaleContext();

  return (
    <Row justify="space-between" align="middle" className={styles.fullWidth}>
      <Col span={12}>
        <Row justify="space-between" align="middle" className={"mainRow"}>
          <Col
            xs={2}
            lg={1}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapse}
          >
            {(direction === "ltr" && collapsed) ||
            (direction === "rtl" && !collapsed) ? (
              <CollapsedIcon isDark={themeMode === "dark"} />
            ) : (
              <UnCollapsedIcon isDark={themeMode === "dark"} />
            )}
          </Col>
          <Col xs={22} lg={23}>
            <Breadcrumb />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row justify={"end"} align="middle">
          <Desktop
            userName={
              !MainUtils.isEmptyObject(configs?.user?.name)
                ? configs?.user?.name
                : " "
            }
            userImage={
              !MainUtils.isEmptyObject(configs?.user?.image)
                ? configs?.user?.image
                : " "
            }
          />
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
