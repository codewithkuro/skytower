// app/layout.jsx
"use client";

import "./globals.css";
import { WagmiProvider } from "wagmi";
import { filecoin, filecoinCalibration } from "wagmi/chains";
import { http, createConfig } from "@wagmi/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Navbar } from "@/components/ui/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ConfettiProvider } from "@/providers/ConfettiProvider";
import Footer from "@/components/ui/Footer";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [filecoinCalibration, filecoin],
  connectors: [],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http(),
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Fil services demo</title>
        <meta
          name="description"
          content="Demo dApp Powered by synapse-sdk. Upload files to Filecoin with USDFC."
        />
        <meta
          name="keywords"
          content="Filecoin, Demo, synapse-sdk, pdp, upload, filecoin, usdfc"
        />
        <meta name="author" content="FIL-Builders" />
        <meta name="viewport" content="width=device-width, initial-scale=0.6" />
        <link rel="icon" href="/filecoin.svg" />
      </head>
      <body>
        <ThemeProvider>
          <ConfettiProvider>
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={config}>
                <RainbowKitProvider
                  modalSize="compact"
                  initialChain={filecoinCalibration.id}
                >
                  <main className="flex flex-col min-h-screen">
                    <Navbar />
                    {children}
                  </main>
                  <Footer />
                </RainbowKitProvider>
              </WagmiProvider>
            </QueryClientProvider>
          </ConfettiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
