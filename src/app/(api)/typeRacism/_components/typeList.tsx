"use client";

import React, { useContext, useState } from 'react';
import { TypeRacismContext } from '@/context/typeRacismContext';
import api from '../apiTypes';
import { TypesRacismProps } from '@/types';

const TypeRacismList = () => {
  const [dados, setDados] = useState<TypesRacismProps[]>([])
  const context = useContext(TypeRacismContext);
  const list = async () =>{
    const data = await api.getTypes()
    setDados(data);
  }
  if (!context) {
    console.error("TypeRacismContext não está disponível.");
    return (
        <div className="text-red-600 p-4 border border-red-300 rounded-md">
            Erro: Contexto de Tipos de Racismo não carregado.
        </div>
    );
  }
  const { types, loading, error, deleteType } = context;


  if (loading) {
    return (
      <section className="my-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Tipos de Racismo Cadastrados</h2>
        <p className="text-gray-600">Carregando tipos de racismo...</p>
      </section>
    );
  }
return (
      <section className="my-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Tipos de Racismo Cadastrados</h2>
         <ul className="space-y-2">
          {dados.map((item) => (
            <li key={item.id} className="p-2 bg-amber-200 rounded">
              {item.descricao}
            </li>
          ))}
          </ul>
        <button
          onClick={list}
          className="mt-4 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
        >Mostrar Lista
        </button>
      </section>
    );
  }

export default TypeRacismList;