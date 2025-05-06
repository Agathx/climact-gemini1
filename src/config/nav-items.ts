import type { LucideIcon } from 'lucide-react';
import { Home, Map, ListChecks, Megaphone, GraduationCap, LifeBuoy, Newspaper, UserCircle, LogIn, Users, Settings } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
  isExternal?: boolean;
  disabled?: boolean;
}

export const navItems: NavItem[] = [
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
];

export const userNavItems: (isLoggedIn: boolean) => NavItem[] = (isLoggedIn) => [
  ...(isLoggedIn
    ? [
        { label: 'Painel do Usuário', href: '/painel', icon: UserCircle },
        { label: 'Configurações', href: '/configuracoes', icon: Settings },
      ]
    : [{ label: 'Login / Cadastro', href: '/auth/login', icon: LogIn }]),
  // { // Example for a section specific to roles
  //   label: 'Painel ONG/Voluntário',
  //   href: '/ong',
  //   icon: Users,
  //   // Add logic here to show only if user has NGO/Volunteer role
  // },
];
