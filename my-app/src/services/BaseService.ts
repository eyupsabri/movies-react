import axios, { AxiosResponse } from "axios";
export const API_INSTANCE = axios.create();

class BaseService {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async get<T>(path: string): Promise<AxiosResponse<T>> {
    return API_INSTANCE.get<T>(`${this.endpoint}${path}`);
  }
  public async getWithData<T = any>(
    path: string,
    data: any
  ): Promise<AxiosResponse<T>> {
    return API_INSTANCE.get<T>(`${this.endpoint}${path}`, { params: data });
  }

  public async post<T>(path: string, data: any): Promise<AxiosResponse<T>> {
    return API_INSTANCE.post<T>(`${this.endpoint}${path}`, data);
  }

  public async put<T>(path: string, data: any): Promise<AxiosResponse<T>> {
    return API_INSTANCE.put<T>(`${this.endpoint}${path}`, data);
  }

  public async delete<T>(path: string): Promise<AxiosResponse<T>> {
    return API_INSTANCE.delete<T>(`${this.endpoint}${path}`);
  }
}

export default BaseService;
