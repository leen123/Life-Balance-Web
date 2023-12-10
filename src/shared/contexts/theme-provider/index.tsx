import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ConfigProvider } from "antd";
import AppLocale from "../../../shared/localization";
import { useLocaleContext } from "../app-context-provider/LocaleContextProvide";

const AppThemeProvider = (props: any) => {
  const { locale, direction, themeMode } = useLocaleContext();

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.body.style.backgroundColor =
      themeMode === "dark" ? "#141432" : "#fff";
  }, [themeMode]);

  return (
    <ConfigProvider
      direction={direction}
      locale={AppLocale[locale?.code]?.antLocale}
    >
      {props.children}
    </ConfigProvider>
  );
};

export default React.memo(AppThemeProvider);

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
