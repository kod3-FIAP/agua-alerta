import { Home, MapPin, Zap } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ArchitectureSection() {
	return (
		<section id="como-funciona" className="w-full py-12 md:py-24 bg-blue-50">
		<div className="container mx-auto px-4 md:px-6">
			<div className="mx-auto max-w-3xl text-center mb-12">
				<div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-primary">Como Funciona</div>
				<h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
					Arquitetura da Solução
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					O sistema Alaga Menos foi concebido para monitorar em tempo real o nível de rios que cortam áreas
					urbanas, emitindo alertas preventivos às famílias em situação de risco.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
				<div className="space-y-4">
					<div className="flex items-start gap-4">
						<div className="mt-1 bg-blue-100 p-2 rounded-full">
							<MapPin className="h-5 w-5 text-primary" />
						</div>
						<div>
							<h3 className="text-xl font-bold">Emissor</h3>
							<p className="text-muted-foreground">
								Dispositivos instalados em pontos estratégicos ao longo do rio, equipados com sensores que medem
								continuamente o nível da água e enviam dados via protocolo MQTT.
							</p>
							<a
								href="https://wokwi.com/projects/432294830552593409"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline mt-2 inline-block"
							>
								Ver simulação do Emissor →
							</a>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="mt-1 bg-blue-100 p-2 rounded-full">
							<Home className="h-5 w-5 text-primary" />
						</div>
						<div>
							<h3 className="text-xl font-bold">Receptor</h3>
							<p className="text-muted-foreground">
								Dispositivos simples instalados nas residências que recebem os alertas via MQTT e fornecem
								indicação visual (LED RGB) e sonora (buzzer) sobre o nível de risco.
							</p>
							<a
								href="https://wokwi.com/projects/432295055686087681"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline mt-2 inline-block"
							>
								Ver simulação do Receptor →
							</a>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="mt-1 bg-blue-100 p-2 rounded-full">
							<Zap className="h-5 w-5 text-primary" />
						</div>
						<div>
							<h3 className="text-xl font-bold">Comunicação MQTT</h3>
							<p className="text-muted-foreground">
								O protocolo MQTT permite uma comunicação eficiente e em tempo real entre os dispositivos emissores
								e receptores, mesmo em redes com largura de banda limitada.
							</p>
						</div>
					</div>
				</div>

				<div className="mx-auto flex justify-center">
					<div className="relative h-[400px] w-full max-w-[650px] rounded-lg overflow-hidden shadow-xl">
						<Image
							src="/architecture.png"
							alt="Arquitetura do sistema Alaga Menos"
							className="object-cover w-full h-full"
							width={600}
							height={400}
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
	)
}
