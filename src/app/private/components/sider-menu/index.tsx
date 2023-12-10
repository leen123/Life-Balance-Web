import styles from "./styles.module.css";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useLocation, matchPath, Link, useHistory } from "react-router-dom";
import { Col, Layout, Menu, Row } from "antd";
import AppConsts from "../../../../constants/appconst";
import LightLogo from "../../../../shared/images/cpointligh.png";
import DarkLogo from "../../../../shared/images/cpointdark.png";
import { useIntl } from "react-intl";
import { useLocaleContext } from "../../../../shared/contexts/app-context-provider/LocaleContextProvide";

const { SubMenu } = Menu;

const SiderMenu = ({ routes, subMenus, collapsed, onCollapse }: any) => {
  const { pathname } = useLocation();
  //selected menu item key
  const [selectedKey, setSelectedKey] = useState("");
  const history = useHistory();
  const { messages } = useIntl();
  const { themeMode } = useLocaleContext();

  //opened sub menu keys
  const [openedKeys, setOpenedKeys] = useState([""]);

  const items = useRef(
    routes
      .filter((route: any) => route.key)
      .reduce((accumulator: any, current: any) => {
        current.subMenu
          ? (accumulator[current.subMenu] = {
              ...(accumulator[current.subMenu] ||
                subMenus.find(
                  (subMenu: any) => subMenu.key === current.subMenu
                )),
              subItems: [
                ...(accumulator[current.subMenu]?.subItems || []),
                current,
              ],
            })
          : (accumulator[current.key] = current);
        return accumulator;
      }, {})
  );

  const onOpenMenuChange = useCallback(
    (openKeys: any) => setOpenedKeys(openKeys),
    []
  );

  useEffect(() => {
    let selectedRoute = routes.find((route: any) =>
      matchPath(pathname, { path: `${AppConsts.publicUrl}${route.path}` })
    );

    if (selectedRoute?.subMenu) {
      const newOpenedKey = selectedRoute.subMenu;

      setOpenedKeys([newOpenedKey]);
    }

    setSelectedKey(
      selectedRoute?.key ? selectedRoute.key : selectedRoute?.relatedToKey
    );
  }, [pathname, routes, setOpenedKeys]);

  return (
    <Layout.Sider
      breakpoint="lg"
      width="208px"
      collapsible
      trigger={null}
      className="sidebar"
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Col
        className={styles.colLogo}
        onClick={() => {
          history.push(AppConsts.publicUrl);
        }}
      >
        <Row align={"middle"} justify={"center"} className={styles.fullWidth}>
          <img
            className={styles.avatar}
            src={themeMode === "dark" ? DarkLogo : LightLogo}
            alt={"Logo"}
          />
        </Row>
      </Col>

      <div className={styles.sideMenu}>
        <Menu
          theme={"light"}
          mode="inline"
          openKeys={openedKeys}
          className={styles.menu}
          onOpenChange={onOpenMenuChange}
          selectedKeys={[selectedKey]}
        >
          {Object.values(items.current).map((item: any) => {
            if (item.subItems)
              return (
                <SubMenu
                  key={item.key}
                  title={
                    <>
                      {item.icon ? item.icon : null}
                      <span>{messages[item.title]}</span>
                    </>
                  }
                >
                  {item.subItems.map((subItem: any) => {
                    return (
                      <Menu.Item key={subItem.key}>
                        <Link to={`${AppConsts.publicUrl}${subItem.path}`}>
                          {subItem.icon ? subItem.icon : null}
                          <span>{messages[subItem.title]}</span>
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            else
              return (
                <Menu.Item key={item.key}>
                  <Link to={`${AppConsts.publicUrl}${item.path}`}>
                    {item.icon ? item.icon : null}
                    <span>{messages[item.title]}</span>
                  </Link>
                </Menu.Item>
              );
          })}
        </Menu>
      </div>
    </Layout.Sider>
  );
};

export default SiderMenu;
