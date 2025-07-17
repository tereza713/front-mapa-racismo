"use client";

import React, { useContext, useState } from 'react';
import { OccurrencesContext } from '@/context/occurrencesContext';
import api from '../apiOccurrences';
import { OccurrencesProps } from '@/types';

const OccurrenceList = () => {
  const [dados, setDados] = useState<OccurrencesProps[]>([])
  const context = useContext(OccurrencesContext);
  const list = async () =>{
    const data = await api.getOccurrences()
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
  const {loading, error } = context;


  if (loading) {
    return (
      <section className="my-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ocorrências Cadastradas</h2>
        <p className="text-gray-600">Carregando ocorrências...</p>
      </section>
    );
  }
return (
      <section className="my-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ocorrências Cadastradas</h2>
         <ul className="space-y-2">
          {dados.map((item) => (
            <li key={item.id} className="p-2 bg-gray-100 rounded">
              {item.descricao}
            </li>
          ))}
          </ul>
        <button
          onClick={list}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >Mostrar Lista
        </button>
      </section>
    );
  }

export default OccurrenceList;