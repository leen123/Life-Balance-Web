import React from 'react';
export interface IBreadcrumbConfigs {
  text: string;
  url: string;
  render?: any;
}

export const BreadcrumbContext = React.createContext({
  setConfig: (e:any) => {},
  config: [{} as IBreadcrumbConfigs],
});
