import { matchPath } from "react-router-dom";

import appConsts from "../../../constants/appconst";

class RouteUtils {
  getPageTitle = (routes: any, pathname: string) => {
    const route = routes.find((route: any) =>
      matchPath(pathname, { path: route.path })
    );
    const localizedAppName = appConsts.appName;
    if (!route) {
      return localizedAppName;
    }
    return route.title + " | " + localizedAppName;
  };
}

export default new RouteUtils();
