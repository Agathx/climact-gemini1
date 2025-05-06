'use client';

import { AppLogo } from '@/components/app-logo';
import { LoginButtonFooter, LoginButtonHeader } from '@/components/auth-buttons';
import { ClientOnlyWrapper } from '@/components/client-only-wrapper';
import { EmergencyButton } from '@/components/emergency-button';
import { SidebarNav } from '@/components/sidebar-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Toaster } from "@/components/ui/toaster";
import { mainNavItemsList } from '@/config/nav-items'; // Changed import
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './globals.css';


interface RootLayoutProps {
  children: React.ReactNode;
}

// Metadata should be defined in a server component or page.tsx if this remains a client component.
// For a root client layout, this metadata object here might not be applied as expected.
// It's generally recommended to define metadata in server components.
// export const metadata: Metadata = {
//   title: "ClimAssist",
//   description: "Ajudando populações em risco climático no Brasil. Promovendo resiliência, ação comunitária e resposta emergencial.",
// };


export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAuthPage = pathname.startsWith('/auth');

  // If it's an authentication page, render a minimal layout
  if (isAuthPage) {
    return (
      <html lang="pt-BR">
        <head>
          {/* Favicon and other critical head elements can be added here or handled globally by Next.js if placed in app/ directory */}
        </head>
        <body>
          <ClientOnlyWrapper>
            <>
              {children}
              <Toaster />
            </>
          </ClientOnlyWrapper>
        </body>
      </html>
    );
  }

  // Main application layout with sidebar
  return (
    <html lang="pt-BR">
      <head>
         {/* Favicon and other critical head elements */}
      </head>
      <body>
        <SidebarProvider defaultOpen={true} open={true} > {/* Control open state as needed */}
          <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
            <SidebarHeader className="p-4 border-b border-sidebar-border">
              <AppLogo />
            </SidebarHeader>
            <SidebarContent className="flex-1 p-2">
              <SidebarNav items={mainNavItemsList} />
            </SidebarContent>
            <SidebarFooter className="p-2 border-t border-sidebar-border">
             <ClientOnlyWrapper>
                <LoginButtonFooter />
              </ClientOnlyWrapper>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:justify-end">
              <div className="md:hidden">
                <ClientOnlyWrapper>
                  <AppLogo iconSize={28} hideText={true} />
                </ClientOnlyWrapper>
              </div>
              <ClientOnlyWrapper>
                <LoginButtonHeader />
              </ClientOnlyWrapper>
            </header>
            <main className="flex-1 p-4 sm:p-6 overflow-auto">
              {children}
            </main>
          </SidebarInset>

          <Toaster />
          <ClientOnlyWrapper>
            <EmergencyButton />
          </ClientOnlyWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}
