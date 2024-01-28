"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export function ThirdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="d04c7a546c4724fc5edb6728ad32248c"
    >
      {children}
    </ThirdwebProvider>
  );
}
