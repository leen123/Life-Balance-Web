import React from 'react';
// @ts-ignore
import Loadable from '@loadable/component';
import Loader from '../loader-page'
const LoadableComponent = (component: any) => Loadable(component, { fallback: <Loader /> });

export default LoadableComponent;
