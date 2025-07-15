"use client"; // Para hooks

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Usuario } from "@/types";

// 1. Defina o schema de validação com Zod
const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof formSchema>;//recebe a 

export default function FormularioCreate() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);
    const [usuariosLoaded, setUsuariosLoaded] = useState(false);

  // Configuração da validação do formulário
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try{
        const resposta = await fetch(
            "https://mapa-do-racismo.onrender.com/auth/criar",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if(!resposta.ok){
            throw new Error("Erro ao criar post");
        }
        const newUsuario = await resposta.json();

        setUsuarios((prev)=>[newUsuario, ...prev.slice(0,4)])//coloca user na lista
        reset();//limpa form

        toast.success("Post de usuário criado com sucesso!");
        //ERRO
    }catch(error){
        console.error("Erro ao criar post:", error);
        toast.error("Erro ao criar post. Tente novamente.");
    }
  };

  return (
    // 3. Formulário semântico com tags HTML5
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col justify-center items-center w-60 bg-amber-300 rounded-3xl">
      <fieldset>
        <legend className="text-stone-950">Criar conta</legend>

        {/* Grupo de campo: Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-lime-700 mb-1">Nome completo</label>
          <input
            type="text"
            {...register("nome")}
            className="text-stone-950 w-full p-3 transition-all duration-100 border-b-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            aria-invalid={!!errors.nome}
            aria-describedby="name-error"
          />
          {errors.nome && (
            <span id="name-error" role="alert" className="text-red-700 text-sm mt-1">
              {errors.nome.message}
            </span>
          )}
        </div>

        {/* Grupo de campo: E-mail */}
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span id="email-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Grupo de campo: Senha */}
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="senha"
            {...register("senha")}
            aria-invalid={!!errors.senha}
            aria-describedby="senha-error"
          />
          {errors.senha && (
            <span id="senha-error" role="alert">
              {errors.senha.message}
            </span>
          )}
        </div>

        <button type="submit">Cadastrar</button>
      </fieldset>
    </form>
  );
}