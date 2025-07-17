import React from "react";

interface FooterProps {
  children: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="bg-stone-950 text-neutral-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        {children}
      </div>
    </footer>
  );
}
