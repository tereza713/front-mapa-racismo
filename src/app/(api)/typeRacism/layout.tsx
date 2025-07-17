"use client";

import { TypeRacismProvider } from '@/context/typeRacismContext';

export default function TypeRacismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <TypeRacismProvider>
        <main className="">
          {children} 
        </main>
      </TypeRacismProvider>
    </div>
  );
}