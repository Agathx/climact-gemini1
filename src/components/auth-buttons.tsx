
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

// Simplified NavItem type for this component
type SimpleNavItem = {
  label: string;
  href: string;
  icon?: React.ElementType;
};

const userLoginNavItems: SimpleNavItem[] = [
  {
    label: 'Login',
    href: '/auth/login',
    icon: UserCircle,
  },
];

// Simplified useUser hook for client-side check
const useUser = () => {
  const [isClient, setIsClient] = useState(false);
  // Simulate auth state, replace with actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Renamed to avoid conflict

  useEffect(() => {
    setIsClient(true);
    // Simulate fetching auth status
    const timer = setTimeout(() => {
      // setIsLoggedIn(checkAuthStatus()); // Replace with actual auth check
      setIsLoggedIn(false); // Default to not logged in for now
      setIsLoadingAuth(false);
    }, 100); // Short delay to simulate async auth check
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    // On the server or before hydration, assume loading
    return { isLoggedIn: false, isLoadingAuth: true };
  }
  return { isLoggedIn, isLoadingAuth };
};


export function LoginButtonFooter() {
  const { isLoggedIn, isLoadingAuth } = useUser();

  if (isLoadingAuth) {
    return <Button variant="outline" className="w-full justify-start" disabled>Carregando...</Button>;
  }

  if (!isLoggedIn) {
    const loginNavItem = userLoginNavItems[0];
    const IconComponent = loginNavItem.icon;
    return (
      <Button asChild variant="outline" className="w-full justify-start">
        <Link href={loginNavItem.href}>
          {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
          {loginNavItem.label}
        </Link>
      </Button>
    );
  }
  // TODO: Add User Profile button or logout if logged in
  return null;
}

export function LoginButtonHeader() {
  const { isLoggedIn, isLoadingAuth } = useUser();

  if (isLoadingAuth) {
    return <Button variant="outline" size="sm" disabled>Carregando...</Button>;
  }

  if (!isLoggedIn) {
    const loginNavItem = userLoginNavItems[0];
    const IconComponent = loginNavItem.icon;
    return (
      <Button asChild variant="outline" size="sm">
        <Link href={loginNavItem.href}>
          {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
          {loginNavItem.label}
        </Link>
      </Button>
    );
  }
  // TODO: Add User Profile Dropdown or similar if logged in
  return null;
}

