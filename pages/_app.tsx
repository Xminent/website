import "@/styles/globals.css";
import "@/styles/main.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import ActualApp from "@/components/App";
import { dev } from "@/lib/config";
import { config } from "@fortawesome/fontawesome-svg-core";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Head from "next/head";
import { useEffect } from "react";
import { Workbox } from "workbox-window";

config.autoAddCss = false;

import type { AppProps } from "next/app";

const lightTheme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: "Manrope, sans-serif",
      mono: "Source Code Pro, monospace",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    fonts: {
      sans: "Manrope, sans-serif",
      mono: "Source Code Pro, monospace",
    },
  },
});

type CustomAppProps = AppProps & {
  Component: {
    requiresAuth: boolean;
  };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || dev) {
      console.warn("PWA support is disabled");
      return;
    }

    const wb = new Workbox("sw.js", { scope: "/" });
    wb.register();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>

      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <ActualApp requiresAuth={Component.requiresAuth}>
            <Component {...pageProps} />
          </ActualApp>
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
