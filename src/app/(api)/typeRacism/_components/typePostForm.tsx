"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeRacismContext } from "@/context/typeRacismContext"; 
import { toast } from "react-toastify";

const typeSchema = z.object({
  descricao: z
    .string()
    .min(1, "A descrição é obrigatória")
    .min(3, "A descrição deve ter pelo menos 3 caracteres"),
});

type TypeFormData = z.infer<typeof typeSchema>;

export default function TypeRacismForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TypeFormData>({
    resolver: zodResolver(typeSchema),
  });

  const context = useContext(TypeRacismContext);
  if (!context) {
    console.error("TypeRacismContext não está disponível.");
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-md">
        Erro: Contexto não carregado.
      </div>
    );
  }

  const { createType, loading } = context;

  const onSubmit = async (data: TypeFormData) => {
    try {
      await createType(data);
      reset();
      toast.success("Tipo de racismo criado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Erro ao criar tipo de racismo.");
        console.error("Erro detalhado:", err);
      } else {
        toast.error("Erro ao criar tipo de racismo.");
        console.error("Erro detalhado:", err);
      }
    }
  };

  return (
    <div className="bg-amber-200 p-6 rounded-lg shadow-md border border-lime-900 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-amber-800">
        Cadastrar Novo Tipo de Racismo
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-zinc-900 mb-1">
            Descrição
          </label>
          <input
            id="descricao"
            {...register("descricao")}
            type="text"
            placeholder="Ex: Racismo estrutural"
            className="w-full p-3 text-zinc-900 border border-zinc-900 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            required
            disabled={isSubmitting || loading}
          />
          {errors.descricao && (
            <span className="text-amber-200 text-sm mt-1">
              {errors.descricao.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full py-3 px-4 bg-amber-700 text-zinc-100 font-medium rounded-lg hover:bg-amber-800 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : (loading ? "Aguarde..." : "Cadastrar")}
        </button>
      </form>
    </div>
  );
}
