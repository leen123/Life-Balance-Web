import React from "react";
import Router from "./router";
import AppContextProvider from "../shared/contexts/app-context-provider";
import AppLocaleProvider from "../shared/contexts/locale-provider";
import AppThemeProvider from "../shared/contexts/theme-provider";

const App = () => {
  return (
    <AppContextProvider>
      <AppLocaleProvider>
        <AppThemeProvider>
          <Router />
        </AppThemeProvider>
      </AppLocaleProvider>
    </AppContextProvider>
  );
};

export default App;
