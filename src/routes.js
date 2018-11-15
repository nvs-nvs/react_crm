import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Загрузка...</div>;
}

const HallInfo = Loadable({
  loader: () => import('./views/Pages/Halls/HallInfo/HallInfo'),
  loading: Loading,
});

const Clients = Loadable({
    loader: () => import('./views/Pages/Services/Clients/Clients'),
    loading: Loading,
});

const routes = [
  { path: '/halls/info', exact: true, name: 'Инфо о зале', component: HallInfo },
  { path: '/halls/', exact: true, name: 'Залы', component: DefaultLayout},
  { path: '/services/clients', exact: true, name: 'Clients', component: Clients},
];

export default routes;
