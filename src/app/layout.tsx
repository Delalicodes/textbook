'use client';

import { useState } from 'react';
import Header from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';
import Footer from '@/components/layouts/footer';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LevelProvider } from '../context/LevelContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

// layout.tsx
return (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <LevelProvider>
        <div className="min-h-screen flex flex-col">
          <Header onSidebarToggle={toggleSidebar} />
          <div className="flex flex-1">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 md:ml-64">
              <main className="pt-16 p-4">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </LevelProvider>
    </body>
  </html>
);
}