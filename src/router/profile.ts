import MainLayoutVue from 'src/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from './names';
/**
 * profileRoutes
 */
export const profileRoutes: RouteRecordRaw = {
  component: MainLayoutVue,
  path: '/profile',
  children: [{
    path: '', name: ROUTE_NAME.PROFILE_HOME, component: () => import('src/pages/profile/Index.vue'),
  }]
}