import { IDatabaseModel } from '../types';
/**
 * IUserProfile
 */
export interface IUserProfile extends IDatabaseModel {
  nick: string;
  nombre: string;
}
/**
 * IUserCredentials
 */
export interface IUserCredentials {
  nick: string;
  password: string;
  remember: number;
  service_name: string;
}
/**
 * IUserRoleName
 */
export type IUserRoleName = 'DEVELOPER' | 'DEVELOPER';
/**
 * IUserRole
 */
export interface IUserRole {
  id: number;
  name: IUserRoleName;
  guard_name: string;
}

export interface IAuthResponse {
  api_token: string;
  profile: IUserProfile;
  roles: IUserRole[];
}