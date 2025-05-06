
// Keep LucideIcon type for potential direct use elsewhere, but NavItem uses string.
import type { LucideIcon as LucideIconType } from 'lucide-react';
import { Home, Map, ListChecks, Megaphone, GraduationCap, LifeBuoy, Newspaper, UserCircle } from 'lucide-react';


export type NavItem = {
  label: string;
  href: string;
  icon?: string; // Changed to string to be used as key in LucideIcons map
  isExternal?: boolean;
  children?: NavItem[];
};

// This specific list is used by src/app/layout.tsx for the main sidebar
export const mainNavItemsList: NavItem[] = [
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

// This list might be used by auth pages or other specific contexts if needed
export const userLoginNavItemsConfig: NavItem[] = [
  {
    label: 'Login',
    href: '/auth/login',
    icon: 'UserCircle',
  },
];
