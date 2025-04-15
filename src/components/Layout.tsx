
import React, { ReactNode } from "react";
import NavBar from "./ui/NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}
