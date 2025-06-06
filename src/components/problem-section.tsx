import { Droplets } from "lucide-react";
import React from "react";

export default function ProblemSection() {
  return (
    <section id="problema" className="w-full bg-blue-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto flex justify-center">
            <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden">
              <Droplets className="h-full w-full object-cover text-primary" />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="text-primary inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">
                O Problema
              </div>
              <h2 className="text-primary mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Enchentes Repentinas
              </h2>
              <p className="text-muted-foreground text-lg">
                Em períodos de chuva intensa, moradores de regiões ribeirinhas
                enfrentam a ameaça constante de serem surpreendidos por
                enchentes. Muitas dessas comunidades pertencem às classes C e D,
                e não possuem acesso a sistemas de monitoramento sofisticados.
              </p>
              <p className="text-muted-foreground mt-4 text-lg">
                A ausência de um sistema de alerta eficiente e em tempo real
                compromete diretamente a segurança, a capacidade de resposta e o
                tempo de evacuação dessas famílias. Em zonas de risco, cada
                minuto pode significar a diferença entre preservar vidas ou
                enfrentar perdas irreparáveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
