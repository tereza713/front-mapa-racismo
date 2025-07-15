import { LoginProps } from "@/types";
import axios from "axios";

//aqui você deve ver quais dados vão ser passados para o front

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL DA API
  withCredentials: true, // PASSA AS CREDENCIAIS CASO TIVER -> PASSA OS COOKIES AUTOMATICAMENTE
});

class AuthAPI {
  async login({ email, senha }: LoginProps) {
    const response = await api.post("/auth/login", { email, senha });
    return response.data;
  }

  async eu() {
    const response = await api.get("/auth/eu");
    return response.data;
  }

  logout = () => {
    api.post("/auth/logout");
  };
}

const authAPI = new AuthAPI();
export default authAPI;