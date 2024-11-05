"use client";

import StoreProvider from "@/app/redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
