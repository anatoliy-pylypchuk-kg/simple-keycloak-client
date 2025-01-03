import React from "react";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import * as Tooltip from "@radix-ui/react-tooltip";

import "./reset.css";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Client",
  description:
    "A simple client application for Keycloak to showcase its functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <SessionProvider>
          <Tooltip.Provider>{children}</Tooltip.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
