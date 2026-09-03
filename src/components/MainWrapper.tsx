"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={isAdmin ? "flex-1" : "flex-1 pt-20"}>{children}</main>
  );
}
