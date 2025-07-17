"use client";
import { OccurrencesProvider } from "@/context/occurrencesContext";
import { TypeRacismProvider } from '@/context/typeRacismContext';

export default function OccurrencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<OccurrencesProvider>
  <TypeRacismProvider>
      <main className="">
        {children}
      </main>
  </TypeRacismProvider>
</OccurrencesProvider>
  );
}