import axios, { AxiosResponse } from "axios";
import { LoginResponseType } from "../types/LoginResponse.type";

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
}

export default new AuthService();
