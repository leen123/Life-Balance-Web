import styles from "./styles.module.css";
import React from "react";
import { Layout } from "antd";
import AppConsts from "../../../../constants/appconst";

const Footer = () => {
  let year: any = new Date().getFullYear();
  return (
    <Layout.Footer className={styles.footer}>
      <div>
        {"© " + year + " "}
        <a
          href="https://circulife.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.companyLink}
        >
          {AppConsts.appName}
        </a>
      </div>
    </Layout.Footer>
  );
};
export default Footer;
