import { useContext, useCallback } from "react";
import { BreadcrumbContext } from "../../contexts/breadcrumb/dtos/breadcrumb-configs";
import MainUtils from "../../utils/main";

const useBreadcrumb = () => {
  const { setConfig } = useContext(BreadcrumbContext);
  const setBreadcrumb = useCallback(
    (configs: any) => {
      if (!MainUtils.isEmptyValue(configs)) {
        setConfig(configs);
      }
    },
    [setConfig]
  );

  return {
    setBreadcrumb,
  };
};
export default useBreadcrumb;
