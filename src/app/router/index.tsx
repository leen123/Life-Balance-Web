import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoadableComponent from "../../shared/components/loadable";
import AppConsts from "../../constants/appconst";
import HomePage from "../../pages/home-page";

const Router = () => {
  const PublicLayout = LoadableComponent(() => import("../public"));
  const PrivateLayout = LoadableComponent(() => import("../private"));

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${AppConsts.publicUrl}/user`}>
          <PublicLayout />
        </Route>

        <Route path={`${AppConsts.publicUrl}/admin`}>
          <PrivateLayout />
        </Route>

        <Route path={`${AppConsts.publicUrl}/`}>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
