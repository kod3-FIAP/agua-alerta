import React from "react";
import { Card, CardContent } from "./ui/card";
import { Users } from "lucide-react";
import Image from "next/image";

export default function TeamSection() {
  return (
    <section id="equipe" className="w-full bg-blue-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="text-primary inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm">
            Equipe
          </div>
          <h2 className="text-primary mt-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Grupo kod3
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Conheça os desenvolvedores por trás do projeto Água Alerta.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src="https://avatars.githubusercontent.com/u/17372417?v=4"
                  alt="Gabriel"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Gabriel de Deus Bianchi</h3>
              <p className="text-muted-foreground">RM 97325</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src="https://avatars.githubusercontent.com/u/77203283?v=4"
                  alt="Leonardo"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Leonardo Mazolini Fernandes</h3>
              <p className="text-muted-foreground">RM 96897</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src="https://avatars.githubusercontent.com/u/79052641?v=4"
                  alt="Mariana"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Mariana do Monte Macêdo</h3>
              <p className="text-muted-foreground">RM 93240</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src="https://avatars.githubusercontent.com/u/113611162?v=4"
                  alt="Marilia"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">
                Marilia Fiorella Méjico Mendoza Bueno
              </h3>
              <p className="text-muted-foreground">RM 97300</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src="https://avatars.githubusercontent.com/u/100859801?v=4"
                  alt="Victor"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">Víctor Bonetti Pegoraro</h3>
              <p className="text-muted-foreground">RM 97533</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
