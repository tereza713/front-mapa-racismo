"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useState } from "react";

// Esquema de validação para login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function FormularioLogin() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await fetch("https://mapa-do-racismo.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro no login");
      }

      // Armazena o token ou dados do usuário
      localStorage.setItem("token", result.token); // ou result.user/token etc

      toast.success("Login realizado com sucesso!");
      reset();
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col justify-center items-center w-60 bg-lime-200 rounded-3xl p-6"
    >
      <fieldset>
        <legend className="text-stone-950 mb-4">Login</legend>

        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full p-2 rounded border border-gray-300"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-red-700 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            id="senha"
            type="password"
            {...register("senha")}
            className="w-full p-2 rounded border border-gray-300"
            aria-invalid={!!errors.senha}
          />
          {errors.senha && (
            <span className="text-red-700 text-sm">{errors.senha.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </fieldset>
    </form>
  );
}
