
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideProps } from 'lucide-react'; // Using LucideProps for better typing
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { NavItem } from '@/app/layout'; // Adjusted import path
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Home,
  Map,
  ListChecks,
  Megaphone,
  GraduationCap,
  LifeBuoy,
  Newspaper,
  UserCircle,
  Settings,
  LogOut,
  Icon as LucideIconDefault // Default fallback icon
} from 'lucide-react';

// Explicitly type the LucideIcons map
const LucideIcons: Record<string, React.ComponentType<LucideProps>> = {
  Home,
  Map,
  ListChecks,
  Megaphone,
  GraduationCap,
  LifeBuoy,
  Newspaper,
  UserCircle,
  Settings,
  LogOut,
  Default: LucideIconDefault, // Fallback
};

interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar(); 

  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn('w-full', className)}>
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            {item.children?.length ? (
              <CollapsibleNavItem item={item} pathname={pathname} sidebarState={sidebarState} />
            ) : (
              <NavItemLink item={item} pathname={pathname} sidebarState={sidebarState} />
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}

interface NavItemLinkProps {
  item: NavItem;
  pathname: string;
  sidebarState: 'expanded' | 'collapsed';
}

function NavItemLink({ item, pathname, sidebarState }: NavItemLinkProps) {
  const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
  const IconComponent = item.icon ? (LucideIcons[item.icon] || LucideIcons.Default) : null;

  const linkContent = (
    <>
      {IconComponent && <IconComponent aria-hidden="true" className="h-4 w-4" />}
      <span>{item.label}</span>
    </>
  );

  if (sidebarState === 'collapsed') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            aria-current={isActive ? 'page' : undefined}
            className="justify-center"
          >
            <Link href={item.href} target={item.isExternal ? '_blank' : undefined}>
               {IconComponent && <IconComponent aria-hidden="true" className="h-5 w-5" />}
               <span className="sr-only">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      aria-current={isActive ? 'page' : undefined}
    >
      <Link href={item.href} target={item.isExternal ? '_blank' : undefined}>
        {linkContent}
      </Link>
    </SidebarMenuButton>
  );
}


function CollapsibleNavItem({ item, pathname, sidebarState }: NavItemLinkProps & { item: NavItem & { children: NavItem[] }}) {
  const isParentActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
  // This is a simplified version. A full collapsible item would need state management (e.g. Radix Collapsible)
  // For now, it will just render the parent and then its children if the path matches.
  const IconComponent = item.icon ? (LucideIcons[item.icon] || LucideIcons.Default) : null;
  const SubIconComponent = (childIconName?: string) => childIconName ? (LucideIcons[childIconName] || LucideIcons.Default) : null;


  return (
    <>
      <NavItemLink item={item} pathname={pathname} sidebarState={sidebarState} />
      {/* TODO: Implement proper collapsibility if sidebarState is expanded and children exist */}
      {/* For now, children are not rendered to keep it simple and avoid Radix Collapsible dependency here */}
       {sidebarState === 'expanded' && isParentActive && item.children && (
        <SidebarMenuSub>
          {item.children.map((child, childIndex) => {
            const ChildIcon = SubIconComponent(child.icon);
            return (
            <SidebarMenuSubItem key={childIndex}>
              <SidebarMenuSubButton
                asChild
                isActive={pathname.startsWith(child.href)}
                aria-current={pathname.startsWith(child.href) ? 'page' : undefined}
              >
                <Link href={child.href} target={child.isExternal ? '_blank' : undefined}>
                  {ChildIcon && <ChildIcon aria-hidden="true" className="h-4 w-4" />}
                  <span>{child.label}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </>
  );
}
