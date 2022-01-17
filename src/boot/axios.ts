import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { IDictionary } from 'src/types';
import { userModule } from 'src/modules';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
export const baseURL = process.env.DEV ? 'http://localhost:8000' : 'https://srv.net';

const $api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
});

export default boot(({ app }) => {
  userModule.load();
  /**
   * Api request Interceptor
   */
  $api.interceptors.request.use((_request) => {
    /* Append content type header if its not present */
    if (!(_request.headers as IDictionary)['Content-Type']) {
      (_request.headers as IDictionary)['Content-Type'] = 'application/json';
    }

    /* Check if authorization is set */
    if (!(_request.headers as IDictionary)['Authorization']) {
      /* Check if the user is authenticated to send Bearer token */
      const token = userModule.apiToken;
      if (token && token.length > 0) {
        (_request.headers as IDictionary).Authorization = 'Bearer ' + token;
      } else {
        /* Send the application authentication as Bearer token */
        (_request.headers as IDictionary).Authorization = 'Bearer ApiToken';
      }
    }
    return _request;
  });
  axios.defaults.withCredentials = true;

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = $api;
});
/**
 * csrf
 * @returns 
 */
const $csrf = () => {
  return $api.get('/sanctum/csrf-cookie');
}
export { $api, $csrf };