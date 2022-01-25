import MainLayoutVue from 'src/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { roleGuard } from './guards';
import { ROUTE_NAME } from './names';
/**
 * phoneRoutes
 */
export const entitiesRoutes: RouteRecordRaw = {
  component: MainLayoutVue,
  path: '/entity',
  beforeEnter: roleGuard,
  children: [
    { path: '', name: ROUTE_NAME.ENTITY_HOME, component: () => import('src/pages/entities/Index.vue') }
  ]
}