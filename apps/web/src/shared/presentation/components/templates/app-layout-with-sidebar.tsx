'use client';

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

  // If auth route, render children without sidebar
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Otherwise, render with sidebar
  return (
    <PageWithSidebarTemplate sidebarProps={{ data: sidebarData }}>
      {children}
    </PageWithSidebarTemplate>
  );
}
