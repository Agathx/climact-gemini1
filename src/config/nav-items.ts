import type {LucideIcon} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  isExternal?: boolean;
  children?: NavItem[];
};

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

export const userLoginNavItems: NavItem[] = [
  {
    label: 'Login',
    href: '/auth/login',
    icon: UserCircle,
  },
];
