import styles from "./styles.module.css";
import "./styles.less";
import React, { useState, useCallback } from "react";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";
import DocumentTitle from "react-document-title";
import Header from "../../../app/private/components/header";
import Footer from "../../../app/private/components/footer";
import SiderMenu from "../../../app/private/components/sider-menu";
import { Affix, Layout as AntdLayout } from "antd";
import AppConsts from "../../../constants/appconst";
import routeUtils from "../../utils/route";
import BreadcrumbProvider from "../../contexts/breadcrumb/breadCrumb";
import clsx from "clsx";
import { useLocaleContext } from "../../contexts/app-context-provider/LocaleContextProvide";

const Layout = ({
  configs,
  routes,
  siderSubMenus,
  rootPath,
  redirectPath,
}: any) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { themeMode } = useLocaleContext();

  const onCollapse = useCallback(
    (collapsed: any) => {
      setCollapsed(collapsed);
    },
    [setCollapsed]
  );

  return (
    <div
      className={clsx("", {
        "dark-mode": themeMode === "dark",
        "light-mode": themeMode === "light",
      })}
    >
      <div className={"systemTheme"}>
        <DocumentTitle title={routeUtils.getPageTitle(routes, pathname)}>
          <BreadcrumbProvider>
            <AntdLayout>
              <div
                className={`${
                  collapsed ? styles.collapsedSider : styles.sider
                } siderStyle`}
              >
                <SiderMenu
                  routes={routes}
                  subMenus={siderSubMenus}
                  collapsed={collapsed}
                  onCollapse={onCollapse}
                />
              </div>

              <div className={`ant-layout`}>
                <Affix offsetTop={0}>
                  <AntdLayout.Header className={"header"}>
                    <Header
                      configs={configs}
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                    />
                  </AntdLayout.Header>
                </Affix>

                <AntdLayout.Content>
                  <Switch>
                    {routes.map((route: any, index: any) => {
                      return (
                        <Route
                          key={index}
                          exact={route.exact ?? true}
                          path={`${AppConsts.publicUrl}${route.path}`}
                        >
                          <route.Component />
                        </Route>
                      );
                    })}
                    <Redirect
                      from={`${AppConsts.publicUrl}${rootPath}`}
                      to={`${AppConsts.publicUrl}${rootPath}${redirectPath}`}
                    />
                  </Switch>
                </AntdLayout.Content>
                <Footer />
              </div>
            </AntdLayout>
          </BreadcrumbProvider>
        </DocumentTitle>
      </div>
    </div>
  );
};

export default Layout;
