"use client";
import { createContext, useState, useEffect } from "react";
import api from "@/app/(api)/typeRacism/apiTypes";
import { TypesRacismProps } from "@/types";

interface TypeRacismContextProps {
  types: TypesRacismProps[];
  loading: boolean;
  error: string | null;
  createType: (data: { descricao: string }) => Promise<void>;
  updateType: (id: string, data: { descricao: string }) => Promise<void>;
  deleteType: (id: string) => Promise<void>;
  fetchTypesOfRacism: () => Promise<void>; 
}

export const TypeRacismContext = createContext<TypeRacismContextProps>({
    types: [],
    loading: false,
    error: null,
    createType: async () => {},
    updateType: async () => {},
    deleteType: async () => {},
    fetchTypesOfRacism: async () => {}, 
});

export const TypeRacismProvider = ({ children }: { children: React.ReactNode }) => {
  const [types, setTypes] = useState<TypesRacismProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTypesOfRacism = async () => {
    setLoading(true);
    try {
      const data = await api.getTypes(); 
      setTypes(data);
    } catch (err:any) {
      setError(err.message || 'Erro ao buscar tipos de racismo.');
      console.error("Erro ao buscar tipos de racismo:", err);
    } finally {
      setLoading(false);
    }
  }

  const createType = async (data: { descricao: string }) => {
    try {
      const response = await api.postTypes(data); 
      setTypes((prev) => [...prev, response]);
    } catch (err: any) {
      setError(err.message || "Erro ao criar tipo de racismo.");
      console.error("Erro ao criar tipo de racismo:", err);
      throw err;
    }
  };

  const updateType =  async (id: string, data: { descricao: string }) => {
    try {
      const response = await api.updateTypes(id, data); 
      setTypes((prev) =>
        prev.map((tipo) => (tipo.id === id ? response : tipo))
      );
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar tipo de racismo.");
      console.error("Erro ao atualizar tipo de racismo:", err);
      throw err;
    }
  };

  const deleteType = async (id: string) => {
    try {
      await api.deleteTypes(id); 
      setTypes((prev) => prev.filter((tipo) => tipo.id!== id));
    } catch (err: any) {
      setError(err.message || "Erro ao deletar tipo de racismo.");
      console.error("Erro ao deletar tipo de racismo:", err);
      throw err;
    }
  }; 
  useEffect(() => {
    fetchTypesOfRacism();
  }, []);


  return (
    <TypeRacismContext.Provider value={{ types, loading, error, createType, updateType, deleteType, fetchTypesOfRacism}}>
      {children}
    </TypeRacismContext.Provider>
  );
};