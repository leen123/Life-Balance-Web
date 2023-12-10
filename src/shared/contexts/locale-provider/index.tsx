import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import AppLocale from "../../../shared/localization";
import { useLocaleContext } from "../app-context-provider/LocaleContextProvide";

const AppLocaleProvider = (props: any) => {
  const { locale } = useLocaleContext();

  return (
    <IntlProvider
      locale={AppLocale[locale?.code]?.locale}
      messages={AppLocale[locale?.code]?.messages}
    >
      {props.children}
    </IntlProvider>
  );
};

export default AppLocaleProvider;

AppLocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
