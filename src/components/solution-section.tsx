import React from "react";
import { Card, CardContent } from "./ui/card";

export default function SolutionSection() {
  return (
    <section id="solucao" className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="text-primary inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">
            A Solução
          </div>
          <h2 className="text-primary mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Água Alerta
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Um sistema preventivo de alerta para inundações, baseado em sensores
            de nível de água conectados via IoT e comunicação por protocolo
            MQTT.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-2 border-green-200 transition-colors hover:border-green-400">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <div className="h-6 w-6 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-green-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Verde</h3>
              <p className="text-muted-foreground">
                Situação normal. O nível do rio está dentro dos parâmetros
                seguros.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 transition-colors hover:border-yellow-400">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <div className="h-6 w-6 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-yellow-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Amarelo</h3>
              <p className="text-muted-foreground">
                Mensagem de Atenção. O nível do rio está subindo e requer
                monitoramento.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 transition-colors hover:border-red-400">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <div className="h-6 w-6 animate-[pulse_0.5s_ease-in-out_infinite] rounded-full bg-red-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Vermelho</h3>
              <p className="text-muted-foreground">
                Risco iminente de inundação. O LED acende vermelho, o buzzer é
                acionado e aparece no display a mensagem de emergência.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
