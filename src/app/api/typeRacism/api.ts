'use client'
import { TypesRacismProps } from "@/types";
import axios from "axios";

class Api {
  consumo = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
  })
  
 async get(){
  const response = await this.consumo.get('/tipo-racismo')
  return response.data
  }

  async post (data:TypesRacismProps){
    const response = await this.consumo.post('/tipo-racismo/criar', data.descricao)
    return response.data
  }

  async update(data:TypesRacismProps){

  }

  async delete(){

  }
}
