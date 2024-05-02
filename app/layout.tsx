import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get your preffered job | Weekday",
  description: "Weekday is a platform where candidates meet recuiters and vice-versa also refer eligible candidates to your company and earn...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Header />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
