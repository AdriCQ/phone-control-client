import { RouteRecordRaw } from 'vue-router';
import { entitiesRoutes } from './entities';
import { facturasRoutes } from './facturas';
import { ROUTE_NAME } from './names';
import { phoneRoutes } from './phones';
import { profileRoutes } from './profile';
import { statsRoutes } from './stats';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: ROUTE_NAME.MAIN, path: '', component: () => import('pages/Index.vue') }],
  },
  entitiesRoutes,
  facturasRoutes,
  phoneRoutes,
  profileRoutes,
  statsRoutes,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
