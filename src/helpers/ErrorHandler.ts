import { AxiosError } from 'axios';
import { $router } from 'src/boot/router';
import { Notify } from 'quasar';
import { userModule } from 'src/modules';
import { IApiResp } from 'src/types';
import { ROUTE_NAME } from 'src/router';

class ErrorHandler {

  private _loading: CallableFunction | undefined;
  /**
   * success
   * @param _p 
   */
  success(_p: string[]) {
    _p.forEach(message => {
      Notify.create({
        type: 'positive',
        message,
        position: 'center'
      })
    })
  }
  /**
    * success
    * @param _p 
    */
  error(_p: string[]) {
    _p.forEach(message => {
      Notify.create({
        type: 'negative',
        message,
        position: 'center'
      })
    })
  }
  /**
   * axiosError
   * @param _error 
   */
  axiosError<T = unknown>(_error: unknown) {
    console.log({ AxiosError: _error });
    const error = _error as AxiosError<IApiResp<T>>;
    if (error.response) {
      if (error.response.status === 401) {
        userModule.logout();
        void $router.push({ name: ROUTE_NAME.MAIN })
        return;
      }
      if (error.response.data && error.response.data.message) {
        this.error(error.response.data.message);
      }
    }
  }
  /**
   * loading
   * @param _load 
   * @param message 
   */
  loading(_load = true, message = 'Cargando...') {
    if (_load) {
      this._loading = Notify.create({
        spinner: true,
        position: 'center',
        message,
      });
    }
    else {
      if (this._loading) this._loading();
    }
  }
}

export const responseHandler = new ErrorHandler();