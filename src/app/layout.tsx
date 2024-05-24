import "~/styles/globals.css";
// import { Inter } from "next/font/google";
import { api } from "~/trpc/server";
import { TRPCReactProvider } from "~/trpc/react";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { openSans } from "~/styles/fonts";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata = {
  title: "Band Manager",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allInstruments = await api.instrument.getAll();
  const allVenues = await api.venue.getAll();
  const allMusicians = await api.musician.getAll();

  return (
    <html lang="en">
      <body className={`font-openSans ${openSans.variable} bg-gradient-jc text-white`}>
        <StoreProvider
          venues={allVenues ? allVenues : []}
          instruments={allInstruments ? allInstruments : []}
          musicians={allMusicians ? allMusicians : []}
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </StoreProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
