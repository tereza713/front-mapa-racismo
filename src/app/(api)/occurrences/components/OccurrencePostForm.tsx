"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { OccurrencesContext } from "@/context/occurrencesContext";
import { TypeRacismContext } from "@/context/typeRacismContext";
import { LocationProps } from "@/types";
import apiLocal from "../../locations/apiLocation";

const occurrenceSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  data: z.string().min(1, "A data é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
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
      localizacaoId: '',
      tipoRacismoId: '',
    }
  });

  const occurrencesContext = useContext(OccurrencesContext);
  const typeRacismContext = useContext(TypeRacismContext);

  if (!occurrencesContext || !typeRacismContext) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-md">
        Erro: Contextos de Ocorrências ou Tipos de Racismo não carregados.
      </div>
    );
  }

  const { createOccurrence, loading: creatingOccurrence } = occurrencesContext;
  const { types: existingTypesRacism, loading: loadingTypesRacism } = typeRacismContext;

  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const data = await apiLocal.getAllLocalizacoes();
        setLocations(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || "Erro ao carregar localizações.");
        } else {
          toast.error("Erro ao carregar localizações.");
        }
      }
    };
    fetchLocations();
  }, []);

  const onSubmit = async (data: OccurrenceFormData) => {
    try {
      const occurrenceData = { ...data };
      await createOccurrence(occurrenceData);
      reset();
      toast.success("Ocorrência cadastrada com sucesso!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Erro ao cadastrar ocorrência.");
      } else {
        toast.error("Erro ao cadastrar ocorrência.");
      }
    }
  };

  const isFormDisabled = isSubmitting || creatingOccurrence || loadingLocations || loadingTypesRacism;

  return (
    <div className="bg-zinc-100 p-6 rounded-lg shadow-md border border-zinc-300 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-amber-700">
        Cadastrar Nova Ocorrência
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-amber-600 mb-1">
            Descrição
          </label>
          <input
            id="descricao"
            {...register("descricao")}
            type="text"
            placeholder="Descreva a ocorrência"
            className="text-black w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            disabled={isFormDisabled}
          />
          {errors.descricao && (
            <span className="text-red-500 text-sm">{errors.descricao.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="data" className="block text-sm font-medium text-amber-600 mb-1">
            Data da Ocorrência
          </label>
          <input
            id="data"
            {...register("data")}
            type="date"
            className="text-black w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            disabled={isFormDisabled}
          />
          {errors.data && (
            <span className="text-red-500 text-sm">{errors.data.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="localizacaoId" className="block text-sm font-medium text-amber-600 mb-1">
            Localização
          </label>
          <select
            id="localizacaoId"
            {...register("localizacaoId")}
            className="text-black w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            disabled={isFormDisabled || loadingLocations}
          >
            <option value="">{loadingLocations ? "Carregando..." : "Selecione uma localização"}</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.descricao}</option>
            ))}
          </select>
          {errors.localizacaoId && (
            <span className="text-red-500 text-sm">{errors.localizacaoId.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="tipoRacismoId" className="block text-sm font-medium text-amber-600 mb-1">
            Tipo de Racismo
          </label>
          <select
            id="tipoRacismoId"
            {...register("tipoRacismoId")}
            className="text-black w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            disabled={isFormDisabled || loadingTypesRacism}
          >
            <option value="">{loadingTypesRacism ? "Carregando..." : "Selecione um tipo"}</option>
            {existingTypesRacism.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
            ))}
          </select>
          {errors.tipoRacismoId && (
            <span className="text-red-500 text-sm">{errors.tipoRacismoId.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-amber-600 mb-1">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="text-black w-full p-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            disabled={isFormDisabled}
          >
            <option value="">Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">{errors.status.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isFormDisabled}
          className="w-full py-3 px-4 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-600 focus:ring-2 focus:ring-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Cadastrar Ocorrência"}
        </button>
      </form>
    </div>
  );
}
