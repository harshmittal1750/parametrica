import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import ClientLayout from "./Web3Provider";
import { FC, PropsWithChildren } from "react";
import theme from "@/styles/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DataProvider } from "@/context/DataContext";
import { LocalizationProviderWrapper } from "@/lib/LocalizationProviderWrapper";
import { ThirdProvider } from "@/ThirdwebProvider";

export const metadata: Metadata = {
  title: "Parametrica",
  description:
    "Parametrica is a decentralized climate prediction market. It is a transparent, secure, and user-friendly platform where participants can speculate, transfer and invest in climate-related risk.",
};

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProviderWrapper>
            <ThirdProvider>
              <DataProvider>
                <ClientLayout>
                  <Header />
                  {children}
                  <Footer />
                </ClientLayout>
              </DataProvider>
            </ThirdProvider>
          </LocalizationProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
