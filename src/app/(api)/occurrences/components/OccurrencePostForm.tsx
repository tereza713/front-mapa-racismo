// app/components/OccurrencePostForm.tsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Contextos e Interfaces
import { OccurrencesContext } from "@/context/occurrencesContext";
import { TypeRacismContext } from "@/context/typeRacismContext";
import { LocationProps } from "@/types"
import apiLocal from "../../locations/apiLocation";

// --- ESQUEMA ZOD ---
const occurrenceSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  data: z.string().min(1, "A data é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  
  // localizacaoId e tipoRacismoId agora são strings e devem ser selecionados (não vazios)
  localizacaoId: z.string().min(1, "Localização é obrigatória."),
  tipoRacismoId: z.string().min(1, "Tipo de racismo é obrigatório."),
});

type OccurrenceFormData = z.infer<typeof occurrenceSchema>;

export default function OccurrencePostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OccurrenceFormData>({
    resolver: zodResolver(occurrenceSchema),
    defaultValues: {
      descricao: '',
      data: '',
      status: '',
      localizacaoId: '', // Valor padrão vazio para o select
      tipoRacismoId: '', // Valor padrão vazio para o select
    }
  });

  // Consumindo os contextos
  const occurrencesContext = useContext(OccurrencesContext);
  const typeRacismContext = useContext(TypeRacismContext);

  // Verificações de contexto
  if (!occurrencesContext || !typeRacismContext) {
    console.error("Contextos não estão disponíveis. Certifique-se de que os Provedores estão envolvendo este componente.");
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-md">
        Erro: Contextos de Ocorrências ou Tipos de Racismo não carregados. Por favor, contate o suporte.
      </div>
    );
  }

  const { createOccurrence, loading: creatingOccurrence } = occurrencesContext;
  const { types: existingTypesRacism, loading: loadingTypesRacism } = typeRacismContext;

  // Estado para localizações
  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // Efeito para carregar localizações
  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const data = await apiLocal.getAllLocalizacoes();
        setLocations(data);
      } catch (err: any) {
        toast.error(err.message || "Erro ao carregar localizações.");
        console.error("Erro ao carregar localizações:", err);
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocations();
  }, []);

  const onSubmit = async (data: OccurrenceFormData) => {
    try {
      const occurrenceData: Omit<OccurrenceFormData, 'id'> = {
        descricao: data.descricao,
        data: data.data,
        status: data.status,
        localizacaoId: data.localizacaoId,
        tipoRacismoId: data.tipoRacismoId,
      };

      await createOccurrence(occurrenceData);
      reset(); // Limpa o formulário após o envio bem-sucedido
      toast.success("Ocorrência cadastrada com sucesso!");
    } catch (err: any) {
      toast.error(err.message || "Erro ao cadastrar ocorrência.");
      console.error("Erro detalhado ao cadastrar ocorrência:", err);
    }
  };

  const isFormDisabled = isSubmitting || creatingOccurrence || loadingLocations || loadingTypesRacism;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Cadastrar Nova Ocorrência
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo: Descrição */}
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            id="descricao"
            {...register("descricao")}
            type="text"
            placeholder="Descreva a ocorrência"
            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isFormDisabled}
          />
          {errors.descricao && (
            <span className="text-red-500 text-sm mt-1">
              {errors.descricao.message}
            </span>
          )}
        </div>

        {/* Campo: Data da Ocorrência */}
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
            Data da Ocorrência
          </label>
          <input
            id="data"
            {...register("data")}
            type="date"
            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isFormDisabled}
          />
          {errors.data && (
            <span className="text-red-500 text-sm mt-1">
              {errors.data.message}
            </span>
          )}
        </div>

        {/* Campo: Localização (Dropdown) */}
        <div>
          <label htmlFor="localizacaoId" className="block text-sm font-medium text-gray-700 mb-1">
            Localização
          </label>
          <select
            id="localizacaoId"
            {...register("localizacaoId")}
            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isFormDisabled || loadingLocations}
          >
            <option value="">{loadingLocations ? "Carregando localizações..." : "Selecione uma localização"}</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.descricao} {/* Use o campo que representa o nome da localização, ex: loc.nome ou loc.descricao */}
              </option>
            ))}
          </select>
          {errors.localizacaoId && (
            <span className="text-red-500 text-sm mt-1">
              {errors.localizacaoId.message}
            </span>
          )}
        </div>

        {/* Campo: Tipo de Racismo (Dropdown) */}
        <div>
          <label htmlFor="tipoRacismoId" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Racismo
          </label>
          <select
            id="tipoRacismoId"
            {...register("tipoRacismoId")}
            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isFormDisabled || loadingTypesRacism}
          >
            <option value="">{loadingTypesRacism ? "Carregando tipos de racismo..." : "Selecione um tipo de racismo"}</option>
            {existingTypesRacism.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descricao}
              </option>
            ))}
          </select>
          {errors.tipoRacismoId && (
            <span className="text-red-500 text-sm mt-1">
              {errors.tipoRacismoId.message}
            </span>
          )}
        </div>

        {/* Campo: Status (Dropdown) */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isFormDisabled}
          >
            <option value="">Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm mt-1">
              {errors.status.message}
            </span>
          )}
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isFormDisabled}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : (isFormDisabled ? "Aguarde..." : "Cadastrar Ocorrência")}
        </button>
      </form>
    </div>
  );
}