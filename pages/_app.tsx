import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { UmiProvider } from "@domains-solana";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Header } from "@components";
import {} from "@stores";
import { NextPageWithOptions } from "@types";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const NETWORK: WalletAdapterNetwork = WalletAdapterNetwork.Mainnet;
const ENDPOINT =
  NETWORK === WalletAdapterNetwork.Mainnet
    ? "https://barbe-s5dgoj-fast-mainnet.helius-rpc.com"
    : "https://api.devnet.solana.com";

type AppPropsWithOptions = AppProps & { Component: NextPageWithOptions };

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppPropsWithOptions) {
  const wallets: any[] = [];
  const router = useRouter();

  const headerVariant = Component.header; // default

  return (
    <ConnectionProvider endpoint={ENDPOINT}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <UmiProvider endpoint={ENDPOINT}>
              <>
                <Header header={headerVariant} />
                <Component key={router.asPath} {...pageProps} />
              </>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    border: "2px solid #0D864C",
                    padding: "16px",
                    color: "#fff",
                    backgroundColor: "#020202",
                  },
                  iconTheme: { primary: "#0D864C", secondary: "#454545" },
                }}
              />
            </UmiProvider>
          </WalletModalProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ConnectionProvider>
  );
}

{
  /* TODO: find better modal package */
}
{
  /* {showModal && (
              <ImageModal show={showModal} close={() => setShowModal(false)} />
            )} */
}
{
  /* toast */
}
