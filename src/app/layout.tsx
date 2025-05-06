import type { Metadata } from 'next/font';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { SidebarNav } from '@/components/sidebar-nav';
import { navItems } from '@/config/nav-items';
import { Header as PageHeader } from '@/components/header'; // Renamed to avoid conflict
import { EmergencyButton } from '@/components/emergency-button';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ClimAssist',
    template: '%s | ClimAssist',
  },
  description: 'Ajudando populações em risco climático no Brasil. Promovendo resiliência, ação comunitária e resposta emergencial.',
  // PWA manifest and icons would be added here or in a manifest.json file
  // For simplicity, not adding full PWA manifest details here.
  // manifest: '/manifest.json', 
  // icons: { apple: '/icon.png' }, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Placeholder for authentication state
  const isLoggedIn = false; // Replace with actual auth check
  const userLoginNavItems = userNavItems(false);

  return (
    <>
      <html lang="pt-BR">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider defaultOpen={true} open={true} > {/* Control open state as needed */}
            <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
              <SidebarHeader className="p-4 border-b border-sidebar-border">
                <AppLogo />
              </SidebarHeader>
              <SidebarContent className="flex-1 p-2">
                <SidebarNav items={navItems} />
              </SidebarContent>
              <SidebarFooter className="p-2 border-t border-sidebar-border">
                {/* User specific nav items or logout */}
                {isLoggedIn ? (
                  <>
                    <SidebarNav items={userNavItems(true)} />
                     <Button variant="ghost" className="w-full justify-start mt-2">
                       <LogOut className="mr-2 h-4 w-4" />
                       Sair
                     </Button>
                  </>
                ) : (
                  <>
                   <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="/auth/login">
                        <userLoginNavItems[0].icon className="mr-2 h-4 w-4" />
                        {userLoginNavItems[0].label}
                      </Link>
                   </Button>
                  </>
                )}
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <PageHeader /> {/* Use the custom Header for the main content area */}
              <main className="flex-1 p-4 sm:p-6 overflow-auto">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
          <EmergencyButton />
        </body>
      </html>
    </>
  );
}
