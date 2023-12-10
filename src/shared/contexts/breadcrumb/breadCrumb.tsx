import React, { useState } from 'react';

import { BreadcrumbContext, IBreadcrumbConfigs } from './dtos/breadcrumb-configs';

const BreadcrumbProvider = ({ children, initialActiveKey }: any) => {
  const [config, setConfig] = useState<Array<IBreadcrumbConfigs>>(initialActiveKey);
  return (
    <BreadcrumbContext.Provider
      value={{
        config,
        setConfig,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
export default BreadcrumbProvider;
