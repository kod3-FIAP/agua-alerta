import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { HeaderRemover } from "./header-remover";
import { Button } from "./ui/button";

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
            <Link href="/dashboard">
              <Button variant={"link"}>Dashboard</Button>
            </Link>
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
