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

const ClientInfo = Loadable({
    loader: () => import('./views/Clients/ClientInfo/ClientInfo'),
    loading: Loading,
});

const routes = [
  { path: '/halls/', exact: true, name: 'Залы', component: DefaultLayout},
  { path: '/halls/info', exact: true, name: 'Инфо о зале', component: HallInfo },
  { path: '/clients', exact: true, name: 'Клиенты', component: DefaultLayout},
  { path: '/clients/info', exact: true, name: 'Инфо о клиенте', component: ClientInfo },
];

export default routes;
