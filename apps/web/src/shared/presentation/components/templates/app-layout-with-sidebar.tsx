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

  const headerData = {
    url: routes.routes.userProfile,
    src: profile?.avatarUrl || '',
    fallback: profile?.name?.charAt(0) || '',
    title: profile?.name || '',
  };

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
        },
        header: headerData,
      }}
    >
      {children}
    </PageWithSidebarTemplate>
  );
}
