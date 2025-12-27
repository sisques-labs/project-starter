'use client';

import { useAuthProfileMe } from '@/generic/auth/presentation/hooks/use-auth-profile-me/use-auth-profile-me';
import { useRoutes } from '@/shared/presentation/hooks/use-routes';
import PageWithSidebarTemplate from '@repo/shared/presentation/components/templates/page-with-sidebar-template';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface AppLayoutWithSidebarProps {
  children: React.ReactNode;
}

/**
 * Layout component that wraps pages with sidebar, excluding auth routes
 */
export function AppLayoutWithSidebar({ children }: AppLayoutWithSidebarProps) {
  const pathname = usePathname();
  const { getSidebarData } = useRoutes();

  // Check if current route is auth (should not show sidebar)
  const isAuthRoute = useMemo(() => {
    return pathname?.includes('/auth') ?? false;
  }, [pathname]);

  // Get sidebar data
  const sidebarData = getSidebarData();

  const routes = useRoutes();

  // Get user profile
  const { profile } = useAuthProfileMe();

  // If auth route, render children without sidebar
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Otherwise, render with sidebar
  return (
    <PageWithSidebarTemplate
      sidebarProps={{
        data: {
          ...sidebarData,
          navAvatarSrc: profile?.avatarUrl || '',
          navAvatarFallback: profile?.name?.charAt(0) || '',
          navTitle: profile?.name || '',
          navHeaderUrl: routes.routes.home || '',
        },
      }}
    >
      {children}
    </PageWithSidebarTemplate>
  );
}
