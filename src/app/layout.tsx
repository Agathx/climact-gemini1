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
import { mainNavItemsList } from '@/config/nav-items';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './globals.css';


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
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
        <ClientOnlyWrapper>
          <SidebarProvider defaultOpen={true} open={true} > {/* Control open state as needed */}
            <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
              <SidebarHeader className="p-4 border-b border-sidebar-border">
                <AppLogo />
              </SidebarHeader>
              <SidebarContent className="flex-1 p-2">
                <SidebarNav items={mainNavItemsList} />
              </SidebarContent>
              <SidebarFooter className="p-2 border-t border-sidebar-border">
                <LoginButtonFooter />
              </SidebarFooter>
            </Sidebar>

            <SidebarInset>
              <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:justify-end">
                <div className="md:hidden">
                    <AppLogo iconSize={28} hideText={true} />
                </div>
                  <LoginButtonHeader />
              </header>
              <main className="flex-1 p-4 sm:p-6 overflow-auto">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ClientOnlyWrapper>
        
        <ClientOnlyWrapper>
          <Toaster />
        </ClientOnlyWrapper>
        <ClientOnlyWrapper>
            <EmergencyButton />
        </ClientOnlyWrapper>
      </body>
    </html>
  );
}
