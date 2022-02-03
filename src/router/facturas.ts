import MainLayoutVue from 'src/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { roleGuard } from './guards';
import { ROUTE_NAME } from './names';
/**
 * phoneRoutes
 */
export const facturasRoutes: RouteRecordRaw = {
  component: MainLayoutVue,
  path: '/factura',
  beforeEnter: roleGuard,
  children: [
    { path: '', name: ROUTE_NAME.FACTURA_HOME, component: () => import('src/pages/facturas/Index.vue') },
    { path: 'details', name: ROUTE_NAME.FACTURA_DETAILS, component: () => import('src/pages/facturas/Details.vue') }
  ]
}