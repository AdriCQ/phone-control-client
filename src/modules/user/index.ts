import { LocalStorage } from 'quasar';
import { $api, $csrf } from 'src/boot/axios';
import { IApiResp } from 'src/types';
import { InjectionKey, ref } from 'vue';
import { IAuthResponse, IUserCredentials, IUserProfile, IUserRole } from './types';

const MODULE_API = '/api/users';
/**
 * User Module  
 */
export class UserModule {
  private _apiToken = ref<string | null>(null);
  private _profile = ref<IUserProfile>({
    id: 0,
    nick: '',
    nombre: ''
  });
  private _roles = ref<IUserRole[]>([]);
  /**
   * ApiToken getter & Setter
   */
  get apiToken() { return this._apiToken.value }
  set apiToken(_token: string | null) { this._apiToken.value = _token }
  /**
   * 
   */
  get profile() { return this._profile.value }
  set profile(_profile: IUserProfile) { this._profile.value = _profile }
  /**
   * 
   */
  get roles() { return this._roles.value }
  set roles(_p: IUserRole[]) { this._roles.value = _p }

  get isAuth() { return this.apiToken }

  /**
   * -----------------------------------------
   *	Services
   * -----------------------------------------
   */
  async authLogin(_credentials: IUserCredentials): Promise<IAuthResponse> {
    try {
      const csrf = await $csrf();
      console.log(csrf);
      const resp = await $api.post<IApiResp<IAuthResponse>>(`${MODULE_API}/login`, _credentials);
      this.apiToken = resp.data.data.api_token;
      this.profile = resp.data.data.profile;
      this.roles = resp.data.data.roles;
      this.save();
      return {
        profile: this.profile, api_token: this.apiToken, roles: this.roles
      }

    } catch (error) { throw error }
  }
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  load() {
    if (LocalStorage.has(MODULE_API)) {
      const resp = LocalStorage.getItem(MODULE_API)?.toString();
      const { api_token, profile, roles } = JSON.parse(resp as string) as unknown as IAuthResponse;
      this.apiToken = api_token;
      this.profile = profile;
      this.roles = roles;
    }
  }

  save() {
    const jsonData: IAuthResponse = {
      api_token: this.apiToken as string,
      profile: this.profile,
      roles: this.roles
    };
    LocalStorage.set(MODULE_API, JSON.stringify(jsonData))
  }

  logout() {
    this.apiToken = null;
    this.roles = [];
    this.profile = {
      id: 0,
      nick: '',
      nombre: '',
    }
    LocalStorage.remove(MODULE_API)
  }
}

export const userModule = new UserModule();

export const userModuleKey: InjectionKey<UserModule> = Symbol('UserModule');

export * from './types';
