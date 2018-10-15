import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Загрузка...</div>;
}

const HallInfo = Loadable({
  loader: () => import('./views/Halls/HallInfo/HallInfo'),
  loading: Loading,
});

const routes = [
  { path: '/halls/', exact: true, name: 'Залы', component: DefaultLayout},
  { path: '/halls/info', exact: true, name: 'Инфо о зале', component: HallInfo },
];

export default routes;
