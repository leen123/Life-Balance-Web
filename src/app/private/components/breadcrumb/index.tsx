import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import AppConsts from '../../../../constants/appconst';
import { BreadcrumbContext } from '../../../../shared/contexts/breadcrumb/dtos/breadcrumb-configs';

const Breadcrumb = () => {
  const location = useLocation();

  const { config } = useContext(BreadcrumbContext);

  const [breadcrumbConfigs, setBreadcrumbConfigs]: any = useState([]);

  const breadcrumbItems = useRef([]);

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    if (config?.length === 0) {
      const breadcrumbConfigs = pathSnippets.map((value: any, index: any) => {
        return {
          text: value,
          url: `${AppConsts.publicUrl}/${pathSnippets.slice(0, index + 1).join('/')}`,
        };
      });
      setBreadcrumbConfigs(breadcrumbConfigs);
    } else {
      setBreadcrumbConfigs(config);
    }
  }, [location, config]);

  breadcrumbItems.current = breadcrumbConfigs?.map((config: any, index: any) => {
    return (
      <AntdBreadcrumb.Item key={index}>
        {config.render ? config.render : <Link to={config.url}>{config.text}</Link>}
      </AntdBreadcrumb.Item>
    );
  });

  return <AntdBreadcrumb separator=">">{breadcrumbItems.current}</AntdBreadcrumb>;
};

export default Breadcrumb;
