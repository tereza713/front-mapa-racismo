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
    register, // de olho no input
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TypeFormData>({
    resolver: zodResolver(typeSchema),
  });

  const context = useContext(TypeRacismContext);
  if (!context) {
    console.error("TypeRacismContext não está disponível. Certifique-se de que TypeRacismProvider envolve este componente.");
    return (
        <div className="text-red-600 p-4 border border-red-300 rounded-md">
            Erro: Contexto de Tipos de Racismo não carregado. Por favor, contate o suporte.
        </div>
    );
  }

  const { createType, loading } = context; 

  const onSubmit = async (data: TypeFormData) => {
    try {
      await createType(data);
      reset();
      toast.success("Tipo de racismo criado com sucesso!");
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar tipo de racismo.");
      console.error("Erro detalhado ao criar tipo de racismo:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Cadastrar Novo Tipo de Racismo
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            id="descricao" 
            {...register("descricao")}
            type="text"
            placeholder="Ex: Racismo estrutural"
            className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting || loading} 
          />
          {errors.descricao && (
            <span className="text-red-500 text-sm mt-1">
              {errors.descricao.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading} 
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : (loading ? "Aguarde..." : "Cadastrar")}
        </button>
      </form>
    </div>
  );
}