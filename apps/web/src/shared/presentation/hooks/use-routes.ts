import { SidebarData } from '@repo/shared/domain/interfaces/sidebar-data.interface';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export const useRoutes = () => {
  const pathname = usePathname();

  const routes = {
    home: '/home',

    feature1: '/feature1',
    feature2: '/feature2',
    feature3: '/feature3',

    settings: '/settings',
    auth: '/auth',
  } as const;

  /**
   * Generates sidebar data structure with active state based on current pathname
   */
  const getSidebarData = (): SidebarData => {
    const t = useTranslations('nav');
    return {
      navMain: [
        {
          title: t('home'),
          url: '#',
          items: [
            {
              title: t('home'),
              url: routes.home,
              isActive: pathname === routes.home,
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
              isActive: pathname === routes.feature1,
            },
            {
              title: t('feature2'),
              url: routes.feature2,
              isActive: pathname === routes.feature2,
            },
            {
              title: t('feature3'),
              url: routes.feature3,
              isActive: pathname === routes.feature3,
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
              isActive: pathname === routes.settings,
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
