import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultConfig from "./defaultConfig";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import AppConsts from "../../../constants/appconst";
import MainUtils from "../../utils/main";
import languageData from "../../../app/private/components/header/language-switcher/data";
import AppLocale from "../../localization";

export type LanguageDto = {
  languageId: string;
  code: keyof typeof AppLocale;
  name: string;
  icon: string;
};
const LocaleContext = createContext<{
  locale: LanguageDto;
  direction: "ltr" | "rtl";
  themeMode: "light" | "dark";
  updateThemeMode: Function;
}>({
  updateThemeMode: () => {},
  direction: "ltr",
  locale: defaultConfig.locale,
  themeMode: "light",
});

export const useLocaleContext = () => useContext(LocaleContext);

const LocaleContextProvider = ({ children }: any) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [locale, updateLocale] = useState<LanguageDto>(defaultConfig.locale);
  const [direction, updateDirection] = useState<"ltr" | "rtl">("ltr");
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    if (!MainUtils.isEmptyValue(cookies[AppConsts.defaultLanguage])) {
      const temp: any = languageData.find(
        (language: any) => language.code === cookies[AppConsts.defaultLanguage]
      );
      if (!MainUtils.isEmptyObject(temp)) updateLocale(temp);
      else updateLocale(defaultConfig.locale);
      if (
        defaultConfig.rtlLocale.indexOf(cookies[AppConsts.defaultLanguage]) !==
        -1
      ) {
        updateDirection("rtl");
      } else {
        updateDirection("ltr");
      }
    } else {
      setCookies(AppConsts.defaultLanguage, "en", {
        path: "/",
        sameSite: true,
      });
    }
    if (
      !MainUtils.isEmptyValue(cookies["themeMode"]) &&
      (cookies["themeMode"] === "light" || cookies["themeMode"] === "dark")
    ) {
      setThemeMode(cookies["themeMode"]);
    } else {
      setThemeMode("light");
      setCookies("themeMode", "light", {
        path: "/",
        sameSite: true,
      });
    }
  }, [cookies, setCookies]);

  const updateThemeMode = () => {
    if (themeMode === "light") {
      setThemeMode("dark");
      setCookies("themeMode", "dark", {
        path: "/",
        sameSite: true,
      });
    } else {
      setThemeMode("light");
      setCookies("themeMode", "light", {
        path: "/",
        sameSite: true,
      });
    }
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        direction,
        themeMode,
        updateThemeMode,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;

LocaleContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
