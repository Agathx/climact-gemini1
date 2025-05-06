import { SidebarNav } from '@/components/sidebar-nav';
import { AppLogo } from '@/components/app-logo';
import Link from 'next/link';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarContent } from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster"
import React from 'react';
import { EmergencyButton } from '@/components/emergency-button';
import type { Metadata } from "next";
import { Home, Map, ListChecks, Megaphone, GraduationCap, LifeBuoy, Newspaper } from 'lucide-react';
import { LoginButtonFooter, LoginButtonHeader } from '@/components/auth-buttons';


// Define the nav items type
export type NavItem = {
  label: string;
  href: string;
  icon?: string; // Changed to string to be used as key
  isExternal?: boolean;
  children?: NavItem[];
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    label: 'Início',
    href: '/',
    icon: 'Home',
  },
  {
    label: 'Mapa de Alertas',
    href: '/mapa-alertas',
    icon: 'Map',
  },
  {
    label: 'Ver Relatos',
    href: '/relatos',
    icon: 'ListChecks',
  },
  {
    label: 'Relatar Desastre',
    href: '/relatar',
    icon: 'Megaphone',
  },
  {
    label: 'Trilhas Educacionais',
    href: '/educacional',
    icon: 'GraduationCap',
  },
  {
    label: 'Central de Ajuda',
    href: '/ajuda',
    icon: 'LifeBuoy',
  },
  {
    label: 'Blog/Notícias',
    href: '/noticias',
    icon: 'Newspaper',
  },
];

export const metadata: Metadata = {
  title: "ClimAssist",
  description: "Ajudando populações em risco climático no Brasil. Promovendo resiliência, ação comunitária e resposta emergencial.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <SidebarProvider defaultOpen={true} open={true} > {/* Control open state as needed */}
          <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
            <SidebarHeader className="p-4 border-b border-sidebar-border">
              <AppLogo />
            </SidebarHeader>
            <SidebarContent className="flex-1 p-2">
             <SidebarNav items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter className="p-2 border-t border-sidebar-border">
              <LoginButtonFooter />
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {children}
          </main>
           {/* Header for mobile and actions like login */}
          <header className="absolute top-6 right-6 md:hidden"> {/* Only show on mobile */}
            <LoginButtonHeader />
          </header>
          <div className="hidden md:block absolute top-6 right-6"> {/* Show on desktop */}
             <LoginButtonHeader />
          </div>
        </SidebarProvider>
        <Toaster />
        <EmergencyButton />
      </body>
    </html>
  );
}
