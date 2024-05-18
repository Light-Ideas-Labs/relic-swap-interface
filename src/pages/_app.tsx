import React from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Modal } from '@/context/Web3Modal';
import RootLayout from "@/components/layouts/RootLayout";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <Web3Modal>
            <RainbowKitProvider>
              <RootLayout>
                <Component />
              </RootLayout>
            </RainbowKitProvider>
            </Web3Modal>
            </QueryClientProvider>
    </ThemeProvider>
  );
}

