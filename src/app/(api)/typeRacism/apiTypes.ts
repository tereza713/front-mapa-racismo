'use client'
import { TypesRacismProps } from "@/types";
import axios from "axios";

class Api {
  consumo = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
  })
  
 async getTypes (){
  const response = await this.consumo.get('/tipos-racismo')
  return response.data
  }

  async postTypes (data:TypesRacismProps){
    const response = await this.consumo.post('/tipos-racismo/criar', data.descricao)
    return response.data
  }

  async updateTypes (id:string, data:TypesRacismProps){
    const response = await this.consumo.put(`/tipos-racismo/atualizar/${id}`, {
      descricao: data.descricao
  });

  return response.data;
  }

  async deleteTypes (id: string) {
    const response = await this.consumo.delete(`/tipos-racismo/deletar/${id}`);
    return response.data;
  }
}

const api = new Api();
export default api;
