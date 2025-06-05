import React from "react";
import { Button } from "./ui/button";

export default function CTASection() {
  return (
    <section className="bg-primary w-full py-12 text-white md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Interessado no Projeto Água Alerta?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Acesse nossa documentação completa e conheça mais sobre como podemos
            ajudar a proteger comunidades em áreas de risco.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white"
            >
              Acessar GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
