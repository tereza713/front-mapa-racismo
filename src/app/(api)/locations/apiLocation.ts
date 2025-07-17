import axios from "axios";
import { LocationProps } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class Api {
  consumo = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
  })

  async getAllLocalizacoes ():Promise<LocationProps[]>{
    const res = await this.consumo.get('/localizacoes');
    return res.data;
  };

  async getLocalizacoesPorTipo(tipoId: string): Promise<LocationProps[]> {
    const res = await this.consumo.get(`/localizacoes/tipo/${tipoId}`);
    return res.data;
  };

  async criarLocalizacao(data: Partial<LocationProps>){
    const payload = {
    nome: data.nome,
    descricao: data.descricao,
    bairro: data.bairro,
    rua: data.rua,
    latitude: data.latitude,
    longitude: data.longitude,
    tipoRacismo: data.tipoRacismo,}
    const res = await this.consumo.post(`/localizacoes/criar`, payload);
    return res.data;
  };

  async atualizarLocalizacao (id: string, data: Partial<LocationProps>) {
    const res = await axios.put(`${API_URL}/localizacoes/atualizar/${id}`, data);
    return res.data;
  };

  async deletarLocalizacao (id: string) {
    const res = await this.consumo.delete(`/localizacoes/deletar/${id}`);
    return res.data
  };
}

const apiLocal = new Api();
export default apiLocal;