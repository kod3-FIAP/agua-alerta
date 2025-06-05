import { Home, MapPin, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ArchitectureSection() {
  return (
    <section id="como-funciona" className="w-full bg-blue-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="text-primary inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">
            Como Funciona
          </div>
          <h2 className="text-primary mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Arquitetura da Solução
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            O sistema Água Alerta foi concebido para monitorar em tempo real o
            nível de rios que cortam áreas urbanas, emitindo alertas preventivos
            às famílias em situação de risco.
          </p>
        </div>

        <div className="grid items-center gap-6 xl:grid-cols-2 xl:gap-12">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-blue-100 p-2">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Emissor</h3>
                <p className="text-muted-foreground">
                  Dispositivos instalados em pontos estratégicos ao longo do
                  rio, equipados com sensores que medem continuamente o nível da
                  água e enviam dados via protocolo MQTT.
                </p>
                <a
                  href="https://wokwi.com/projects/432294830552593409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-2 inline-block hover:underline"
                >
                  Ver simulação do Emissor →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-blue-100 p-2">
                <Home className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Receptor</h3>
                <p className="text-muted-foreground">
                  Dispositivos simples instalados nas residências que recebem os
                  alertas via MQTT e fornecem indicação visual (LED RGB) e
                  sonora (buzzer) sobre o nível de risco.
                </p>
                <a
                  href="https://wokwi.com/projects/432295055686087681"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-2 inline-block hover:underline"
                >
                  Ver simulação do Receptor →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-blue-100 p-2">
                <Zap className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Comunicação MQTT</h3>
                <p className="text-muted-foreground">
                  O protocolo MQTT permite uma comunicação eficiente e em tempo
                  real entre os dispositivos emissores e receptores, mesmo em
                  redes com largura de banda limitada.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto flex justify-center">
            <div className="relative h-[400px] w-full max-w-[650px] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/architecture.png"
                alt="Arquitetura do sistema Água Alerta"
                className="h-full w-full object-cover object-left"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
