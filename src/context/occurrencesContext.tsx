"use client";
import { createContext, useState, useEffect } from "react";
import { OccurrencesProps } from "@/types";
import apiOccurrences from "@/app/(api)/occurrences/apiOccurrences";

interface OccurrencesContextType { 
  occurrences: OccurrencesProps[];
  loading: boolean;
  error: string | null;
  createOccurrence: (data: Omit<OccurrencesProps, 'id' | 'data' | 'status'> & { data: string, status: string }) => Promise<void>;
  updateOccurrence: (id: string, data: OccurrencesProps) => Promise<void>; 
  deleteOccurrence: (id: string) => Promise<void>;
  fetchOccurrences: () => Promise<void>;
}

export const OccurrencesContext = createContext<OccurrencesContextType>({
    occurrences: [],
    loading: false,
    error: null,
    createOccurrence: async () => {},
    updateOccurrence: async () => {},
    deleteOccurrence: async () => {},
    fetchOccurrences: async () => {}, 
});

export const OccurrencesProvider = ({ children }: { children: React.ReactNode }) => { 
  const [occurrences, setOccurrences] = useState<OccurrencesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOccurrences = async () => {
    setLoading(true);
    try {
      const data = await apiOccurrences.getOccurrences();
      setOccurrences(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao buscar tipos de racismo.');
        console.error("Erro ao buscar tipos de racismo:", err);
      } else {
        setError('Erro ao buscar tipos de racismo.');
        console.error("Erro ao buscar tipos de racismo:", err);
      }
    }
  }

  const createOccurrence = async (data: Omit<OccurrencesProps, 'id' | 'data' | 'status'> & { data: string, status: string }) => { // Renomeado e tipo de 'data' adaptado
    try {
      const response = await api.postOccurrences(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao criar ocorrência.");
        console.error("Erro ao criar ocorrência:", err);
      } else {
        setError("Erro ao criar ocorrência.");
        console.error("Erro ao criar ocorrência:", err);
      }
      throw err;
    }
  };

  const updateOccurrence = async (id: string, data: OccurrencesProps) => {
    try {
      const response = await apiOccurrences.updateOccurrences(id, data);
      setOccurrences((prev) =>
        prev.map((occurrence) => (occurrence.id === id ? response : occurrence))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao atualizar ocorrência.");
        console.error("Erro ao atualizar ocorrência:", err);
      } else {
        setError("Erro ao atualizar ocorrência.");
        console.error("Erro ao atualizar ocorrência:", err);
      }
      throw err;
    }
  };

  const deleteOccurrence = async (id: string) => {
    try {
      await apiOccurrences.deleteOccurrences(id);
      setOccurrences((prev) => prev.filter((occurrence) => occurrence.id!== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao criar ocorrência.");
        console.error("Erro ao criar ocorrência:", err);
      } else {
        setError("Erro ao criar ocorrência.");
        console.error("Erro ao criar ocorrência:", err);
      }
      throw err;
    }
  }; 
  
  useEffect(() => {
    fetchOccurrences();
  }, []);

  return (
    <OccurrencesContext.Provider value={{ occurrences, loading, error, createOccurrence, updateOccurrence, deleteOccurrence, fetchOccurrences}}> {/* Renomeado */}
      {children}
    </OccurrencesContext.Provider>
  );
};