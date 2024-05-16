import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ weight: "500", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Red Wine Quality Prediction",
  description: "A machine learning application that detects the quality of red wine on the basis of various scientific macros like alcohol percentage, pH, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
