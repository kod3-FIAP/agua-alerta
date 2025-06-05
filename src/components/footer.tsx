import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-6 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Image src="/logo.svg" alt="Alaga Menos" width={48} height={48} />
            <span>Alaga Menos</span>
          </div>
          <p className="text-center text-sm text-gray-400 md:text-left">
            © 2025 Grupo kod3. Todos os direitos reservados. Global Solution
            2025/1 - FIAP
          </p>
        </div>
      </div>
    </footer>
  );
}
