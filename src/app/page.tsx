import { ArrowRight, Bell, Droplets, Shield, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="from-background to-muted relative flex min-h-screen items-center bg-gradient-to-b">
        <div className="container w-full px-4 md:px-6">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col space-y-6 text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Alaga Menos essa pagina ta feia
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Tecnologia a serviço da prevenção de alagamentos. Monitoramento
                inteligente para proteger comunidades vulneráveis.
              </p>
              <Button size="lg" className="w-fit">
                Como funciona <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-muted/50 relative overflow-hidden rounded-2xl shadow-lg">
              <div className="bg-muted/30 aspect-video w-full">
                {/* Video placeholder - replace src with actual video */}
                <video
                  className="h-full w-full object-cover"
                  poster="/placeholder.jpg"
                  controls
                >
                  <source src="/demo.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-muted/50 py-24">
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
      </section>

      {/* Benefits Section */}
      <section className="py-24">
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
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-24">
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
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container px-4 md:px-6">
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
              <p className="text-muted-foreground text-sm">
                Projeto acadêmico desenvolvido para promover a segurança e
                prevenção de desastres naturais.
              </p>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-muted-foreground text-center text-sm">
            © 2024 Alaga Menos. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
