import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { FC, PropsWithChildren } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DataProvider } from "../context/DataContext";
import ThirdwebProviderWrapper from "../components/ThirdwebProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../components/theme-provider";
import NPProgress from "@/components/ui/Npprogess";

export const metadata: Metadata = {
  title: "Parametrica",
  description:
    "Parametrica is a decentralized climate prediction market. It is a transparent, secure, and user-friendly platform where participants can speculate, transfer and invest in climate-related risk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" attribute="class">
          <ThirdwebProviderWrapper

          // signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
          >
            <NPProgress>
              <DataProvider>
                <Header /> <Toaster />
                {children}
                <Footer />
              </DataProvider>
            </NPProgress>
          </ThirdwebProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
