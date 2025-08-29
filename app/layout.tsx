import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./assets/fonts/fonts";
import { ToastContainer } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata: Metadata = {
  title: "MyNotebook",
  description: "Welcome to my notebook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ToastContainer
          closeOnClick={false}
          draggable={false}
          newestOnTop={true}
          theme="colored"
          pauseOnHover={false}
          autoClose={6000}
        />
        {children}
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
