"use client";
import { TypeRacismProvider } from '@/context/typeRacismContext';

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