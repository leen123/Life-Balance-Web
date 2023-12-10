import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Col, Dropdown, Menu, Popconfirm, Row } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  KeyOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import AppConsts from "../../../../../constants/appconst";
import styles from "../styles.module.css";
import { useIntl } from "react-intl";
import { useLocaleContext } from "../../../../../shared/contexts/app-context-provider/LocaleContextProvide";
import { MdDarkMode, MdLightMode } from "react-icons/all";

const Desktop = ({ userName, userImage }: any) => {
  const { messages } = useIntl();
  const { themeMode, updateThemeMode } = useLocaleContext();

  const userDropdownMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`${AppConsts.publicUrl}/`}>
          <HomeOutlined />
          <span>{messages["Home"]}</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${AppConsts.publicUrl}/user/change-password`}>
          <KeyOutlined />
          <span>{messages["ChangePassword"]}</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.clear();
          window.location.href = `${AppConsts.publicUrl}/user/login`;
        }}
      >
        <LogoutOutlined />
        <span>{messages["Logout"]}</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row gutter={8} className={styles.desktopRow}>
      <Col>
        <div className={styles.themeIcon}>
          {themeMode === "light" ? (
            <Popconfirm
              placement="bottom"
              title={messages["ChangeToDarkMode"]}
              onConfirm={() => updateThemeMode()}
            >
              <MdDarkMode />
            </Popconfirm>
          ) : (
            <Popconfirm
              placement="bottom"
              title={messages["ChangeToLightMode"]}
              onConfirm={() => updateThemeMode()}
            >
              <MdLightMode />
            </Popconfirm>
          )}
        </div>
      </Col>
      <Col>
        <Dropdown overlay={userDropdownMenu} trigger={["hover"]}>
          {userName ? (
            <Row align={"middle"} gutter={4} className={"fullHeight"}>
              <Col>
                <Avatar
                  size={30}
                  icon={<UserOutlined />}
                  className={styles.userAvatar}
                  alt={"profile"}
                  src={userImage}
                />
              </Col>
              <Col>
                <div className={styles.userName}>{userName}</div>
              </Col>
              <Col>
                <DownOutlined />
              </Col>
            </Row>
          ) : (
            <Row align={"middle"} gutter={4} className={"fullHeight"}>
              <Col>
                <Avatar
                  size={30}
                  icon={<UserOutlined />}
                  className={styles.userAvatar}
                  alt={"profile"}
                  src={userImage}
                />
              </Col>
              <Col>
                <DownOutlined />
              </Col>
            </Row>
          )}
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Desktop;
