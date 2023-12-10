import React from "react";
import PropTypes from "prop-types";
import LocaleContextProvider from "./LocaleContextProvide";

const AppContextProvider = ({ children }: any) => {
  return <LocaleContextProvider>{children}</LocaleContextProvider>;
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
