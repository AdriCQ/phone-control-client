import MainLayoutVue from 'src/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { roleGuard } from './guards';
import { ROUTE_NAME } from './names';
/**
 * phoneRoutes
 */
export const phoneRoutes: RouteRecordRaw = {
  component: MainLayoutVue,
  path: '/phones',
  children: [
    { beforeEnter: roleGuard, path: '', name: ROUTE_NAME.PHONE_HOME, component: () => import('src/pages/tel/Search.vue') },
    { beforeEnter: roleGuard, path: 'form', name: ROUTE_NAME.PHONE_FORM, component: () => import('src/pages/tel/Form.vue') },
    { path: 'search', name: ROUTE_NAME.PHONE_SEARCH, component: () => import('src/pages/tel/Search.vue'), }
  ]
}