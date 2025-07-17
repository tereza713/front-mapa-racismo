import React from "react";

interface ChildrenProps{
    children: React.ReactNode;
}
export default function Main({children}: ChildrenProps) {
  return (
    <main className="w-full flex flex-col items-center gap-y-10 px-4 py-10">
      {children}
    </main>
  );
}