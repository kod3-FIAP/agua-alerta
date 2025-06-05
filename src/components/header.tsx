import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { HeaderRemover } from "./header-remover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <HeaderRemover>
      <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 container mx-auto w-full border-b backdrop-blur">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="ml-2 flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Alaga Menos Logo"
              width={40}
              height={40}
            />
            <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
              Alaga Menos
            </span>
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2 mr-2">
              <span className="text-sm font-medium">{session.user.name ?? session.user.email}</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {session.user.email?.[0]?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {session.user.email?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {session.user.email}
                        </span>
                      </div>
                    </div>
                    <div className="bg-border h-px" />
                    <form
                      action={async () => {
                        "use server";
                        await auth.api.signOut({
                          headers: await headers(),
                        });
                        redirect("/");
                      }}
                    >
                      <Button
                        variant="ghost"
                        className="text-destructive w-full justify-start gap-2"
                        type="submit"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Link href="/login">
              <Button variant={"link"}>Entrar</Button>
            </Link>
          )}
        </div>
      </header>
    </HeaderRemover>
  );
}
