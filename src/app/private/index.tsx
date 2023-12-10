import React, { useEffect, useState, Fragment } from "react";
import { routes } from "./routes";
import Layout from "../../shared/components/layout";
import Loader from "../../shared/components/loader-page";
import config from "../../shared/services/configs";
import user from "../../configs/user";

const PrivateLayout = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [configs, setConfigs] = useState<any>();

  useEffect(() => {
    (async () => {
      setIsLogged(false);
      const configs: any = await config.load();
      if (configs) {
        await user.load(configs?.user);
        setConfigs(configs);
      }
      setIsLogged(true);
    })();
  }, []);

  return (
    <Fragment>
      {isLogged ? (
        <Layout
          configs={configs}
          routes={routes}
          rootPath="/admin"
          redirectPath="/sections"
        />
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default PrivateLayout;
