import React from "react";
import Icon from "@ant-design/icons";

const CollapsedIcon = (props: any) => {
  const CollapsedSvg = () => (
    <svg
      id="vuesax_bold_arrow-left"
      data-name="vuesax/bold/arrow-left"
      xmlns="http://www.w3.org/2000/svg"
      width="16.608"
      height="16.608"
      viewBox="0 0 16.608 16.608"
    >
      <g id="arrow-left" transform="translate(0 0)">
        <path
          id="Vector"
          d="M6.92,0A6.92,6.92,0,1,1,0,6.92,6.922,6.922,0,0,1,6.92,0ZM4.5,7.439H8.089L6.9,8.629a.522.522,0,0,0,0,.734.518.518,0,0,0,.734,0L9.709,7.287a.522.522,0,0,0,0-.734L7.633,4.477a.519.519,0,1,0-.734.734L8.089,6.4H4.5a.519.519,0,0,0,0,1.038Z"
          transform="translate(1.384 1.384)"
          fill={props?.isDark ? "#fff" : "#000"}
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M0,16.608H16.608V0H0Z"
          fill="none"
          opacity="0"
        />
      </g>
    </svg>
  );
  return <Icon component={CollapsedSvg} {...props} />;
};
export default CollapsedIcon;
