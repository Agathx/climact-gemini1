'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {LucideIcon} from 'lucide-react';
import * as React from 'react';

import {cn} from '@/lib/utils';
import type {NavItem} from '@/config/nav-items';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {useSidebar} from '@/components/ui/sidebar'; // Ensure this hook exists and provides sidebar state
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
} from 'lucide-react';

const LucideIcons: Record<string, LucideIcon> = {
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
};

interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}

export function SidebarNav({items, className}: SidebarNavProps) {
  const pathname = usePathname();
  const {state: sidebarState} = useSidebar(); // Use 'state' for collapsed/expanded

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

function NavItemLink({item, pathname, sidebarState}: NavItemLinkProps) {
  const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);

  const linkContent = (
    <>
      {item.icon && React.createElement(LucideIcons[item.icon as keyof typeof LucideIcons], { 'aria-hidden': true })}
      <span>{item.label}</span>
    </>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarMenuButton
          asChild
          isActive={isActive}
          aria-current={isActive ? 'page' : undefined}
          className={cn(sidebarState === 'collapsed' && 'justify-center')}
        >
          <Link href={item.href} target={item.isExternal ? '_blank' : undefined}>
            {linkContent}
          </Link>
        </SidebarMenuButton>
      </TooltipTrigger>
      {sidebarState === 'collapsed' && (
        <TooltipContent side="right" align="center">
          {item.label}
        </TooltipContent>
      )}
    </Tooltip>
  );
}


function CollapsibleNavItem({item, pathname, sidebarState}: NavItemLinkProps & { item: NavItem & { children: NavItem[] }}) {
  // This is a simplified version. A full collapsible item would need state management (e.g. Radix Collapsible)
  // For now, it will just render the parent and then its children if the path matches.
  const isParentActive = pathname.startsWith(item.href);

  return (
    <>
      <NavItemLink item={item} pathname={pathname} sidebarState={sidebarState} />
      {isParentActive && item.children && ( // Only show sub-menu if parent is active for simplicity
        <SidebarMenuSub>
          {item.children.map((child, childIndex) => (
            <SidebarMenuSubItem key={childIndex}>
              <SidebarMenuSubButton
                asChild
                isActive={pathname.startsWith(child.href)}
                aria-current={pathname.startsWith(child.href) ? 'page' : undefined}
              >
                <Link href={child.href} target={child.isExternal ? '_blank' : undefined}>
                  {child.icon && React.createElement(LucideIcons[child.icon as keyof typeof LucideIcons], { 'aria-hidden': true })}
                  <span>{child.label}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </>
  );
}
