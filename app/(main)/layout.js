"use client";
import Navbar from "@/components/shared/Navbar";
import useAuth from "@/lib/hooks/useAuth";

export default function RootLayout({ children }) {
  useAuth();
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
