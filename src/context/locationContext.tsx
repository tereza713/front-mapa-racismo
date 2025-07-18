// app/context/LocationContext.tsx
"use client";

import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios"; // Você está usando axios na sua API, então importe aqui
// Importe a interface LocationProps e TypesRacismProps do seu arquivo de tipos
import { LocationProps, TypesRacismProps } from "@/types"; 

// Importe a instância da sua API de Localização que você exportou como 'apiLocal'
import apiLocal from "@/app/(api)/locations/apiLocation"; // Ajuste o caminho para o seu apiLocation.ts

// 1. Definição da Interface do Contexto de Localização
interface LocationContextType {
  locations: LocationProps[];
  loading: boolean;
  error: string | null;
  createLocation: (data: Omit<LocationProps, 'id' | '_count'>) => Promise<LocationProps>; // Para criação, ID e _count são gerados pelo backend
  updateLocation: (id: string, data: Partial<LocationProps>) => Promise<LocationProps>;
  deleteLocation: (id: string) => Promise<void>;
  fetchLocations: () => Promise<void>;
}

// 2. Criação do Contexto de Localização
export const LocationContext = createContext<LocationContextType>({
  locations: [],
  loading: false,
  error: null,
  // Implementações dummy para o valor padrão
  createLocation: async () => { console.warn("createLocation não implementado no contexto padrão."); return {} as LocationProps; },
  updateLocation: async () => { console.warn("updateLocation não implementado no contexto padrão."); return {} as LocationProps; },
  deleteLocation: async () => { console.warn("deleteLocation não implementado no contexto padrão."); },
  fetchLocations: async () => { console.warn("fetchLocations não implementado no contexto padrão."); },
});

// 3. Provedor do Contexto de Localização
export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar todas as localizações
  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLocal.getAllLocalizacoes(); // Chama o método do seu apiLocal
      setLocations(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar localizações.');
      console.error("Erro ao buscar localizações:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para criar uma nova localização
  const createLocation = useCallback(async (data: Omit<LocationProps, 'id' | '_count'>): Promise<LocationProps> => {
    setLoading(true); // Ou um estado de loading mais granular
    setError(null);
    try {
      // A API espera um objeto com nome, descricao, bairro, etc., e tipoRacismo (TypesRacismProps)
      const response = await apiLocal.criarLocalizacao(data); 
      setLocations((prev) => [...prev, response]);
      return response; // Retorna a localização criada com ID
    } catch (err: any) {
      setError(err.message || "Erro ao criar localização.");
      console.error("Erro ao criar localização:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para atualizar uma localização
  const updateLocation = useCallback(async (id: string, data: Partial<LocationProps>): Promise<LocationProps> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLocal.atualizarLocalizacao(id, data);
      setLocations((prev) =>
        prev.map((loc) => (loc.id === id ? response : loc))
      );
      return response;
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar localização.");
      console.error("Erro ao atualizar localização:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para deletar uma localização
  const deleteLocation = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiLocal.deletarLocalizacao(id);
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    } catch (err: any) {
      setError(err.message || "Erro ao deletar localização.");
      console.error("Erro ao deletar localização:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para buscar localizações na montagem do provedor
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Valor que será fornecido pelo Contexto
  const contextValue: LocationContextType = {
    locations,
    loading,
    error,
    createLocation,
    updateLocation,
    deleteLocation,
    fetchLocations,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook personalizado (opcional) para consumir o Contexto de Localização
export const useLocations = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocations must be used within a LocationProvider');
  }
  return context;
};