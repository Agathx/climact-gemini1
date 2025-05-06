import { SidebarNav } from '@/components/sidebar-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle, Settings, LogOut } from 'lucide-react';
import { AppLogo } from './../components/app-logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster"
import React from 'react';
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { EmergencyButton } from '@/components/emergency-button';
import Image from 'next/image';

// Define the nav items type
export type NavItem = {
  label: string;
  href: string;
  icon?: React.ElementType;
  isExternal?: boolean;
  children?: NavItem[];
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// Mock function to determine user's login status
const useUser = () => {
  // Replace this with your actual authentication logic
  return {
    isLoggedIn: false, // Example: User is not logged in
  };
};

const userLoginNavItems: NavItem[] = [
  {
    label: 'Login',
    href: '/auth/login',
    icon: UserCircle,
  },
];

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const { isLoggedIn } = useUser();

  return (
    <html lang="pt-BR">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <SidebarProvider defaultOpen={true} open={true} > {/* Control open state as needed */}
          <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
            <div className="p-4 border-b border-sidebar-border">
              <AppLogo />
            </div>
            <SidebarNav items={[
              {
                label: 'Início',
                href: '/',
                icon: Home,
              },
              {
                label: 'Mapa de Alertas',
                href: '/mapa-alertas',
                icon: Map,
              },
              {
                label: 'Ver Relatos',
                href: '/relatos',
                icon: ListChecks,
              },
              {
                label: 'Relatar Desastre',
                href: '/relatar',
                icon: Megaphone,
              },
              {
                label: 'Trilhas Educacionais',
                href: '/educacional',
                icon: GraduationCap,
              },
              {
                label: 'Central de Ajuda',
                href: '/ajuda',
                icon: LifeBuoy,
              },
              {
                label: 'Blog/Notícias',
                href: '/noticias',
                icon: Newspaper,
              },
            ]} />
            <div className="p-2 border-t border-sidebar-border">
              {/* Add extra content here */}
            </div>
          </Sidebar>
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {children}
          </main>
        </SidebarProvider>
        <Toaster />
        <EmergencyButton />
      </body>
    </html>
  );
}
    
