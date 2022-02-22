/**
 * IDictionary
 */
export interface IDictionary<T = string> {
  [key: string]: T;
}
/**
 * IApiResp
 */
export interface IApiResp<DataType = unknown> {
  status: boolean;
  message: string[];
  data: DataType;
}

export * from './quasar';