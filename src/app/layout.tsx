
'use client'; // Marking RootLayout as a client component as it orchestrates client components and their state.

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import Link from 'next/link';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import React, { useEffect, useState } from 'react';
import { EmergencyButton } from '@/components/emergency-button';
import { Home, Map, ListChecks, Megaphone, GraduationCap, LifeBuoy, Newspaper, UserCircle } from 'lucide-react';
import { LoginButtonFooter, LoginButtonHeader } from '@/components/auth-buttons';
import { ClientOnlyWrapper } from '@/components/client-only-wrapper';
import { usePathname } from 'next/navigation';
import { SidebarNav } from '@/components/sidebar-nav';
import { mainNavItemsList as mainNavItems, userLoginNavItemsConfig as userLoginNavItems } from '@/config/nav-items';
import type { NavItem } from '@/config/nav-items';


interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({
  children,
}: RootLayoutProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if the current path is an auth path
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) {
    // For auth pages, render children directly without the main layout shell
    // This also means Toaster might need to be re-added here if needed on auth pages specifically
    // or use a nested layout for auth pages that includes it.
    return (
      <html lang="pt-BR">
        <ClientOnlyWrapper>
          <body>
            {children}
            <Toaster />
          </body>
        </ClientOnlyWrapper>
      </html>
    );
  }
  
  return (
    <html lang="pt-BR">
      <ClientOnlyWrapper>
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

            <SidebarInset>
              {/* Header for mobile and actions like login */}
              <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:justify-end">
                  <div className="md:hidden"> {/* Mobile: Show Logo (via AppLogo or specific component) & menu toggle */}
                    {/* <SidebarTrigger />  // Assuming SidebarTrigger is for toggling the sidebar */}
                    <AppLogo iconSize={28} hideText={true}/>
                  </div>
                  <LoginButtonHeader />
              </header>
              <main className="flex-1 p-4 sm:p-6 overflow-auto">
                {children}
              </main>
            </SidebarInset>

            <Toaster />
            <EmergencyButton />
          </SidebarProvider>
        </body>
      </ClientOnlyWrapper>
    </html>
  );
}

