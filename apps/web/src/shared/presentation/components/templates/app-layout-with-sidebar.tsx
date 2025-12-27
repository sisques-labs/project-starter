'use client';

import { useAuthLogout } from '@/generic/auth/presentation/hooks/use-auth-logout/use-auth-logout';
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
  const { getSidebarData, routes } = useRoutes();

  // Check if current route is auth (should not show sidebar)
  const isAuthRoute = useMemo(() => {
    return pathname?.includes('/auth') ?? false;
  }, [pathname]);

  // Get sidebar navigation data
  const sidebarNavData = getSidebarData();

  // Get user profile
  const { profile } = useAuthProfileMe();

  // Get logout handler
  const { handleLogout } = useAuthLogout();

  // Prepare sidebar data with header and footer
  const sidebarData = useMemo(() => {
    return {
      ...sidebarNavData,
      header: {
        appName: 'App Name', // TODO: Get from config or env
        logoSrc: undefined, // TODO: Add logo path
        url: routes.home,
      },
      footer: {
        avatarSrc: profile?.avatarUrl || undefined,
        avatarFallback:
          profile?.name?.charAt(0) || profile?.userName?.charAt(0) || 'U',
        name: profile?.name || profile?.userName || 'User',
        profileUrl: routes.userProfile,
      },
    };
  }, [sidebarNavData, profile, routes]);

  // Handle logout with user ID
  const onLogout = useMemo(() => {
    if (!profile?.userId) return undefined;
    return () => handleLogout(profile.userId);
  }, [profile?.userId, handleLogout]);

  // If auth route, render children without sidebar
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Otherwise, render with sidebar
  return (
    <PageWithSidebarTemplate
      sidebarProps={{
        data: sidebarData,
        onLogout,
      }}
    >
      {children}
    </PageWithSidebarTemplate>
  );
}
