import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu } from "antd";
import "./index.style.less";
import { useCookies } from "react-cookie";
import languageData from "./data";
import AppConsts from "../../../../../constants/appconst";
import {
  LanguageDto,
  useLocaleContext,
} from "../../../../../shared/contexts/app-context-provider/LocaleContextProvide";
import { useIntl } from "react-intl";

const AppLanguageSwitcher = () => {
  // eslint-disable-next-line
  const [cookie, setCookies] = useCookies();
  const { locale } = useLocaleContext();
  const { messages } = useIntl();

  const changeLanguage = (language: any) => {
    setCookies(
      AppConsts.defaultLanguage,
      language?.code?.toLowerCase().toString(),
      {
        path: "/",
        sameSite: true,
      }
    );
  };

  const menu = (
    <Menu id="language-switcher">
      {languageData.map((language: LanguageDto, index: any) => (
        <Menu.Item key={index} onClick={() => changeLanguage(language)}>
          <div className="langItem">
            <i className={`flag flag-24 flag-${language.icon}`} />
            <h4>{messages[language.name]}</h4>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Fragment>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        overlayStyle={{ zIndex: 1052 }}
      >
        <span
          className="ant-dropdown-link langBtn"
          onClick={(e) => e.preventDefault()}
        >
          <span className="lang-icon">
            <i
              className={`flag flag-24 flag-${
                locale?.code === "en" ? "us" : locale?.icon
              }`}
            />
          </span>
        </span>
      </Dropdown>
    </Fragment>
  );
};

export default AppLanguageSwitcher;

AppLanguageSwitcher.defaultProps = {
  iconOnly: false,
};

AppLanguageSwitcher.propTypes = {
  iconOnly: PropTypes.bool,
};
