"use client";
import { TypeRacismProvider } from '@/context/typeRacismContext';
import LocalizacaoForm from "./_components/localizacaoForm";

export default function OccurrencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <TypeRacismProvider>
      <main className="">
        {children}
      </main>
  </TypeRacismProvider>
  );
}