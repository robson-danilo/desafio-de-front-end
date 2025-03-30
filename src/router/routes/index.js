

import { lazy } from 'react';
export const RoutesWith = [
  {
    path: '/',
    component: lazy(() => import('../../views/Home/Home'))
  },
  {
    path: '/weather/:city',
    component: lazy(() => import('../../views/Weather/Weather'))
  },

];

const Routes = RoutesWith.map((route) => {
  return {
    ...route
  };
});

export { Routes };

