import * as React from 'react';

import { SidebarData } from '@repo/shared/domain/interfaces/sidebar-data.interface';
import { SidebarHeader as SidebarHeaderType } from '@repo/shared/domain/interfaces/sidebar-header.interface';
import { SearchForm } from '@repo/shared/presentation/components/organisms/search-form';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@repo/shared/presentation/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui';
export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: SidebarData;
  header: SidebarHeaderType;
}

export function AppSidebar({ data, header, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" variant="outline">
              <a href={header.url}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={header.src} />
                  <AvatarFallback>{header.fallback}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{header.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
