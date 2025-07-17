'use client'
import { OccurrencesProps } from "@/types";
import axios from "axios";

class Api {
  consumo = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
  })
  
 async getOccurrences (){
  const response = await this.consumo.get('/ocorrencias')
  return response.data
  }

  async postOccurrences (data:OccurrencesProps){
    const response = await this.consumo.post('/ocorrencias/criar', data.descricao)
    return response.data
  }

  async updateOccurrences (id:string, data:OccurrencesProps){
    const response = await this.consumo.put(`/ocorrencias/atualizar/${id}`, {
      descricao: data.descricao
  });

  return response.data;
  }

  async deleteOccurrences (id: string) {
    const response = await this.consumo.delete(`/ocorrencias/deletar/${id}`);
    return response.data;
  }
}

const api = new Api();
export default api;
