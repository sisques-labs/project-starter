import { SidebarData } from '@repo/shared/domain/interfaces/sidebar-data.interface';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export const useRoutes = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  const routes = {
    home: `/${locale}/home`,
    feature1: `/${locale}/feature1`,
    feature2: `/${locale}/feature2`,
    feature3: `/${locale}/feature3`,
    settings: `/${locale}/settings`,
    auth: `/${locale}/auth`,
    userProfile: `/${locale}/user/profile`,
  } as const;

  /**
   * Generates sidebar data structure with active state based on current pathname
   */
  const getSidebarData = (): SidebarData => {
    return {
      navMain: [
        {
          title: t('home'),
          url: '#',
          items: [
            {
              title: t('home'),
              url: routes.home,
              isActive: pathname === routes.home || pathname?.endsWith('/home'),
            },
          ],
        },
        {
          title: t('features'),
          url: '#',
          items: [
            {
              title: t('feature1'),
              url: routes.feature1,
              isActive:
                pathname === routes.feature1 || pathname?.endsWith('/feature1'),
            },
            {
              title: t('feature2'),
              url: routes.feature2,
              isActive:
                pathname === routes.feature2 || pathname?.endsWith('/feature2'),
            },
            {
              title: t('feature3'),
              url: routes.feature3,
              isActive:
                pathname === routes.feature3 || pathname?.endsWith('/feature3'),
            },
          ],
        },
        {
          title: t('settings'),
          url: routes.settings,
          items: [
            {
              title: t('settings'),
              url: routes.settings,
              isActive:
                pathname === routes.settings || pathname?.endsWith('/settings'),
            },
          ],
        },
      ],
    };
  };

  return {
    routes,
    getSidebarData,
  };
};
