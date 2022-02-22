import MainLayoutVue from 'src/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { roleGuard } from './guards';
import { ROUTE_NAME } from './names';
/**
 * phoneRoutes
 */
export const statsRoutes: RouteRecordRaw = {
  component: MainLayoutVue,
  path: '/stats',
  beforeEnter: roleGuard,
  children: [
    { path: '', name: ROUTE_NAME.STATS_HOME, component: () => import('src/pages/stats/Index.vue') },
  ]
}