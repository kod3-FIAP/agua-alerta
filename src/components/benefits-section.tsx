import { Info, Shield } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { AlertTriangle } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="text-primary inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">
            Benefícios
          </div>
          <h2 className="text-primary mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Por que usar o Água Alerta?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <AlertTriangle className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Alertas em Tempo Real</h3>
              <p className="text-muted-foreground">
                Receba alertas imediatos sobre o nível do rio, permitindo uma
                evacuação antecipada em caso de risco.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Segurança</h3>
              <p className="text-muted-foreground">
                Proteje famílias em região de risco e seus bens com um sistema
                confiável de monitoramento e alerta.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Info className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Informação Clara</h3>
              <p className="text-muted-foreground">
                Sistema de cores intuitivo e mensagens diretas que facilitam a
                compreensão do nível de risco.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
