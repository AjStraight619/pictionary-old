import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/providers/query-client-provider";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pictionary With Friends",
  description:
    "Play pictionary with your friends and keep track of your scores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <Image
            src={"/pictionary-bg.png"}
            alt="Pictionary"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            className="-z-10 select-none"
          />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
