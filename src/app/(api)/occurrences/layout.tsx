"use client";
import { OccurrencesProvider } from "@/context/occurrencesContext";
import { TypeRacismProvider } from '@/context/typeRacismContext';
import OccurrencePostForm from "./components/OccurrencePostForm";

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
        <OccurrencePostForm />
      </main>
  </TypeRacismProvider>
</OccurrencesProvider>
  );
}