import { userModule } from 'src/modules';
import { NavigationGuard } from 'vue-router';
import { ROUTE_NAME } from './names';
/**
 * authGuard
 * @param _to 
 * @param _from 
 * @param _next 
 */
export const authGuard: NavigationGuard = (_to, _from, _next) => {
  if (userModule.isAuth)
    _next();
  else
    _next(ROUTE_NAME.MAIN);
}
/**
 * roleGuard
 * @param _to 
 * @param _from 
 * @param _next 
 */
export const roleGuard: NavigationGuard = (_to, _from, _next) => {
  // Available routes
  if (_to.name === ROUTE_NAME.MAIN) {
    _next();
  }
  else if (userModule.roles && userModule.roles.length && userModule.roles.find(_role => _role.name === 'DEVELOPER' || _role.name === 'ADMIN')) {
    _next();
  }
  else {
    userModule.logout();
    _next({ name: ROUTE_NAME.MAIN })
  }
}