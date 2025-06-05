import { Info, Shield } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { AlertTriangle } from 'lucide-react'

export default function BenefitsSection() {
	return (
		<section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-primary">Benefícios</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                Por que usar o Alaga Menos?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Alertas em Tempo Real</h3>
                  <p className="text-muted-foreground">
                    Receba alertas imediatos sobre o nível do rio, permitindo uma evacuação antecipada em caso de risco.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Segurança</h3>
                  <p className="text-muted-foreground">
                    Proteje famílias em região de risco e seus bens com um sistema confiável de monitoramento e alerta.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Informação Clara</h3>
                  <p className="text-muted-foreground">
                    Sistema de cores intuitivo e mensagens diretas que facilitam a compreensão do nível de risco.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
	)
}
