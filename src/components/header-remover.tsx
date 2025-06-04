"use client";

import { usePathname } from "next/navigation";

export function HeaderRemover({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const blockedPaths = ["/login", "/register"];
  const shouldHideHeader = blockedPaths.includes(pathname);

  if (shouldHideHeader) {
    return null;
  }

  return <>{children}</>;
}
