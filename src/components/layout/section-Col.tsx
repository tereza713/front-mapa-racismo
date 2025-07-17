import React from "react";

interface ChildrenProps{
    children: React.ReactNode;
}

export default function SectionCol({children}: ChildrenProps) {
  return (
    <section className="bg-orange-950 flex flex-col items-center text-center justify-center gap-6 p-18 text-neutral-100 w-full">
        {children}
      
    </section>
  );
}