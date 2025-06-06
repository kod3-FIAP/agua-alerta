import { ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import ArchitectureSection from "~/components/architecture-section";
import BenefitsSection from "~/components/benefits-section";
import CTASection from "~/components/cta-section";
import Footer from "~/components/footer";
import ProblemSection from "~/components/problem-section";
import SolutionSection from "~/components/solution-section";
import TeamSection from "~/components/team-section";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <main className="min-h-screen">
      <section className="from-background to-muted relative flex min-h-screen items-center bg-gradient-to-b">
        <div className="container mx-auto w-full px-4 md:px-6">
          <div className="mx-auto grid max-w-7xl items-center gap-12">
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl"
                data-aos="zoom-y-out"
              >
                Alerta preventivo de
                <span className="text-primary bg-clip-text"> inundações</span>
              </h1>
              <div className="mx-auto max-w-3xl">
                <p
                  className="mb-8 text-xl text-gray-600"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Conheça o{" "}
                  <span className="text-primary font-semibold">
                    Água Alerta
                  </span>
                  , um sistema baseado em sensores de nível de água conectados
                  via IoT e comunicação por protocolo MQTT.
                </p>
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <Link href="#problema">
                    <Button
                      size="lg"
                      className="text-background text-base"
                    >
                      Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/final.gif"
                  alt="Demonstração do sistema Água Alerta em funcionamento"
                  width={1000}
                  height={1000}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProblemSection />

      <SolutionSection />

      <ArchitectureSection />

      <BenefitsSection />

      <TeamSection />

      <CTASection />

      <Footer />

      {/* How it Works Section */}
      {/* <section className="bg-muted/50 py-24" id="como-funciona">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Como Funciona
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Droplets className="text-primary mb-4 h-12 w-12" />
                <CardTitle>Sensores Inteligentes</CardTitle>
                <CardDescription>
                  Sensores de alta precisão monitoram níveis de água em rios e
                  lagos
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Bell className="text-primary mb-4 h-12 w-12" />
                <CardTitle>Monitoramento 24/7</CardTitle>
                <CardDescription>
                  Sistema de monitoramento contínuo com análise em tempo real
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="text-primary mb-4 h-12 w-12" />
                <CardTitle>Alertas Preventivos</CardTitle>
                <CardDescription>
                  Notificações automáticas para autoridades e comunidades
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="text-primary mb-4 h-12 w-12" />
                <CardTitle>Resposta Rápida</CardTitle>
                <CardDescription>
                  Coordenação eficiente entre agentes públicos e comunidades
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      {/* <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Benefícios</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Proteção de Comunidades</CardTitle>
                <CardDescription>
                  Sistema focado em áreas vulneráveis, priorizando a segurança
                  da população
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tecnologia Acessível</CardTitle>
                <CardDescription>
                  Solução de baixo custo e fácil implementação para qualquer
                  região
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prevenção de Desastres</CardTitle>
                <CardDescription>
                  Redução significativa de danos através de alertas antecipados
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Apoio Governamental</CardTitle>
                <CardDescription>
                  Integração com órgãos públicos para resposta rápida e
                  eficiente
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Impacto Esperado
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>GP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      &ldquo;O sistema tem potencial para reduzir em até 80% os
                      danos causados por alagamentos em nossa região.&rdquo;
                    </p>
                    <p className="mt-2 font-medium">Gestor Público</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      &ldquo;Uma solução inovadora que pode salvar vidas e
                      proteger o patrimônio das comunidades.&rdquo;
                    </p>
                    <p className="mt-2 font-medium">Comunidade Local</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>EP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      &ldquo;Tecnologia acessível que pode ser replicada em
                      qualquer região do país.&rdquo;
                    </p>
                    <p className="mt-2 font-medium">
                      Especialista em Prevenção
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-bold">Contato</h3>
              <p className="text-muted-foreground text-sm">
                Email: contato@alagamenos.com.br
                <br />
                Tel: (11) 99999-9999
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Redes Sociais</h3>
              <p className="text-muted-foreground text-sm">
                Instagram: @alagamenos
                <br />
                Twitter: @alagamenos
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Sobre</h3>
              <p className="text-muted-foreground w-[300px] text-sm">
                Projeto acadêmico desenvolvido para promover a segurança e
                prevenção de desastres naturais.
              </p>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-muted-foreground text-center text-sm">
            © 2024 Água Alerta. Todos os direitos reservados.
          </p>
        </div>
      </footer> */}
    </main>
  );
}
