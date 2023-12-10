import styles from "./index.module.css";
import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import DocumentTitle from "react-document-title";
import "./styles.less";
import routeUtils from "../../shared/utils/route";

import AppConsts from "../../constants/appconst";

import { routes } from "./routes";
import { Layout } from "antd";
import clsx from "clsx";
import { useLocaleContext } from "../../shared/contexts/app-context-provider/LocaleContextProvide";

const PublicLayout = () => {
  const { pathname } = useLocation();
  const { themeMode } = useLocaleContext();
  return (
    <DocumentTitle title={routeUtils.getPageTitle(routes, pathname)}>
      <Layout
        className={clsx("", {
          "dark-mode": themeMode === "dark",
          "light-mode": themeMode === "light",
        })}
      >
        <Layout.Content className={styles.publicContainer}>
          <Switch>
            {routes
              .filter((item: any) => !item.isLayout)
              .map((route: any, index: number) => (
                <Route
                  key={index}
                  exact={route.exact}
                  component={route.component}
                  path={`${AppConsts.publicUrl}${route.path}`}
                />
              ))}
            <Redirect
              from={`${AppConsts.publicUrl}/user`}
              to={`${AppConsts.publicUrl}/user/login`}
            />
          </Switch>
        </Layout.Content>
      </Layout>
    </DocumentTitle>
  );
};

export default PublicLayout;
