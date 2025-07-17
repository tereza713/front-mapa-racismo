import React from "react";

interface ChildrenProps{
    children: React.ReactNode;
}

export default function SectionLinCol({children}: ChildrenProps) {
  return (
    <section className="w-full px-4 py-6 flex flex-col md:flex-row gap-6 justify-center items-center">
        {children}
      
      {/* Container 1 <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3">*/}
    </section>
  );
}