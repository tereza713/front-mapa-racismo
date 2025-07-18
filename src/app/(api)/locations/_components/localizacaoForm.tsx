// app/components/LocationPostForm.tsx
"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { TypeRacismContext } from "@/context/typeRacismContext";
import apiLocal from "../apiLocation";
import { TypesRacismProps } from "@/types";
import { TypesRacismProps } from "@/types";

const locationSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  bairro: z.string().optional(),
  rua: z.string().optional(),
  tipoRacismoId: z.string().min(1, "Tipo de racismo é obrigatório"),
});

type LocationFormData = z.infer<typeof locationSchema>;

export default function LocationPostForm() {
  const { types: tipos, loading } = useContext(TypeRacismContext) ?? { types: [], loading: false };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      bairro: "",
      rua: "",
      tipoRacismoId: "",
    },
  });

const onSubmit = async (data: LocationFormData) => {
  try {
    await apiLocal.criarLocalizacao({
      ...data,
    });
    toast.success("Localização cadastrada com sucesso!");
    reset();
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message || "Erro ao cadastrar localização.");
    } else {
      toast.error("Erro ao cadastrar localização.");
    }
  }
};

  return (
    <div className="bg-zinc-100 p-6 rounded-lg shadow-md border border-zinc-300 max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-amber-700">Cadastrar Nova Localização</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-amber-600 mb-1">Nome</label>
          <input {...register("nome")} className="text-black w-full p-3 border border-zinc-300 rounded-lg" />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-600 mb-1">Descrição</label>
          <input {...register("descricao")} className="text-black w-full p-3 border border-zinc-300 rounded-lg" />
          {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-600 mb-1">Bairro</label>
          <input {...register("bairro")} className="text-black w-full p-3 border border-zinc-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-600 mb-1">Rua</label>
          <input {...register("rua")} className="text-black w-full p-3 border border-zinc-300 rounded-lg" />
        </div>
      
        <div>
          <label className="block text-sm font-medium text-amber-600 mb-1">Tipo de Racismo</label>
          <select {...register("tipoRacismoId")} className="text-black w-full p-3 border border-zinc-300 rounded-lg" disabled={loading}>
            <option value="">{loading ? "Carregando..." : "Selecione um tipo"}</option>
            {tipos?.map((tipo: TypesRacismProps) => (
            {tipos?.map((tipo: TypesRacismProps) => (
              <option key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
            ))}
          </select>
          {errors.tipoRacismoId && <span className="text-red-500 text-sm">{errors.tipoRacismoId.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-600">
          {isSubmitting ? "Enviando..." : "Cadastrar Localização"}
        </button>
      </form>
    </div>
  );
}