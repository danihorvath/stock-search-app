import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ToastContainer, toast } from "react-toastify";
import GlobalAlert from "@/components/GlobalAlert";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Search App",
  description: "Stay updated with the latest stock prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalAlert />
        <ToastContainer position="bottom-right" theme="colored" />
        {children}
      </body>
    </html>
  );
}
