export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  code?: string;
  data?: T;
}
