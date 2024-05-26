import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import "@/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Modal } from '@/context/Web3Modal';
import RootLayout from "@/components/layouts/RootLayout";
import { ThemeProvider } from "@/components/theme-provider/ThemeProvider";


export default function App({ Component, pageProps }: AppProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <Web3Modal>
            <RainbowKitProvider
               theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
            >
              <RootLayout>
                <Component {...pageProps}/>
              </RootLayout>
            </RainbowKitProvider>
          </Web3Modal>
    </ThemeProvider>
  );
}

