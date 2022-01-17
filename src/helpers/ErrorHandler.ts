import { AxiosError } from 'axios';
import { Notify } from 'quasar';
import { IApiResp } from 'src/types';

class ErrorHandler {
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
  axiosError<T = unknown>(_error: AxiosError<IApiResp<T>>) {
    if (_error.response && _error.response.data && _error.response.data.message) {
      this.error(_error.response.data.message);
    }
  }
}

export const responseHandler = new ErrorHandler();