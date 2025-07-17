import axios from "axios";
import { LocalProps } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllLocalizacoes = async (): Promise<LocalProps[]> => {
  const res = await axios.get(`${API_URL}/localizacoes`);
  return res.data;
};

export const getLocalizacoesPorTipo = async (tipoId: string): Promise<LocalProps[]> => {
  const res = await axios.get(`${API_URL}/localizacoes/tipo/${tipoId}`);
  return res.data;
};

export const criarLocalizacao = async (data: Partial<LocalProps>) => {
  const res = await axios.post(`${API_URL}/localizacoes/criar`, data);
  return res.data;
};

export const atualizarLocalizacao = async (id: string, data: Partial<LocalProps>) => {
  const res = await axios.put(`${API_URL}/localizacoes/atualizar/${id}`, data);
  return res.data;
};

export const deletarLocalizacao = async (id: string) => {
  await axios.delete(`${API_URL}/localizacoes/deletar/${id}`);
};