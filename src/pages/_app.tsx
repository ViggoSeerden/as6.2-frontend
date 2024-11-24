import { Header } from "../components/nav/header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-w-screen">
      <SessionProvider>
        <Header />
        <div className="min-h-[80vh] flex flex-row overflow-x-hidden w-full px-5 py-5">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </div>
  )
}
