import styles from './styles.module.css';
import React from 'react';
import AppConsts from "../../constants/appconst";

const SVGIcon = ({ className, isIcon, name }: any) => {
  return (
    <img
      className={
        className ?
          isIcon ?
            `${className} ${styles.icon}`
            : `${className}` :
          `${styles.icon}`
      }
      src={`${AppConsts.publicUrl}/assets/images/svg/${name}.svg`}
      alt={name}
    />
  );
};
export default SVGIcon;
