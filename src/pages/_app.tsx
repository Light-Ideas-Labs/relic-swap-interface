import React from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import "@/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Modal } from '@/context/Web3Modal';
import RootLayout from "@/components/layouts/RootLayout";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <Web3Modal>
            <RainbowKitProvider>
              <RootLayout>
                <Component {...pageProps}/>
              </RootLayout>
            </RainbowKitProvider>
          </Web3Modal>
    </ThemeProvider>
  );
}

