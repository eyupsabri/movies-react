import axios, { AxiosResponse } from "axios";
import { LoginResponseType } from "../types/LoginResponse.type";
import { RegisterType } from "../types/Register.type";

class AuthService {
  private api = axios.create({
    baseURL: "https://localhost:7209/api/Authentication",
  });

  public async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<LoginResponseType>> {
    return this.api.post<LoginResponseType>(`/login`, { email, password });
  }

  public async register(
    data: RegisterType
  ): Promise<AxiosResponse<LoginResponseType>> {
    return this.api.post<LoginResponseType>(`/register`, data);
  }
}

export default new AuthService();
