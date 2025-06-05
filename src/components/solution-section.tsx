import React from 'react'
import { Card, CardContent } from './ui/card'

export default function SolutionSection() {
	return (
		<section id="solucao" className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-primary">A Solução</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                Alaga Menos
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Um sistema preventivo de alerta para inundações, baseado em sensores de nível de água conectados via IoT
                e comunicação por protocolo MQTT.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                    <div className="h-6 w-6 rounded-full bg-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Verde</h3>
                  <p className="text-muted-foreground">
                    Situação normal. O nível do rio está dentro dos parâmetros seguros.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
                    <div className="h-6 w-6 rounded-full bg-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Amarelo</h3>
                  <p className="text-muted-foreground">
                    Mensagem de Atenção. O nível do rio está subindo e requer monitoramento.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 hover:border-red-400 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                    <div className="h-6 w-6 rounded-full bg-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Vermelho</h3>
                  <p className="text-muted-foreground">
                    Risco iminente de inundação. O LED acende vermelho, o buzzer é acionado e aparece no display a
                    mensagem de emergência.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
	)
}
