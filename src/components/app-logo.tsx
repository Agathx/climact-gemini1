import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface AppLogoProps {
  className?: string;
  iconSize?: number;
  hideText?: boolean;
}

export function AppLogo({ className, iconSize = 24, hideText = false }: AppLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-accent-foreground ${className}`}>
      <ShieldAlert size={iconSize} className="text-sidebar-primary" />
      {!hideText && <span className="font-semibold text-lg">ClimAssist</span>}
    </Link>
  );
}
