'use client';

import { useTenants } from '@repo/sdk';
import { Button } from '@repo/shared/presentation/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/shared/presentation/components/ui/dialog';
import { Input } from '@repo/shared/presentation/components/ui/input';
import { Label } from '@repo/shared/presentation/components/ui/label';
import { Textarea } from '@repo/shared/presentation/components/ui/textarea';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRoutes } from '@/shared/presentation/hooks/use-routes';

interface TenantCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/**
 * Modal for creating a tenant after user registration
 * This is configurable - can be enabled/disabled via environment variable
 */
export function TenantCreateModal({
  open,
  onOpenChange,
  onSuccess,
}: TenantCreateModalProps) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { routes } = useRoutes();
  const { create } = useTenants();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      return;
    }

    try {
      await create.fetch({
        name: name.trim(),
        description: description.trim() || null,
        email: email.trim() || null,
      });

      onSuccess?.();
      onOpenChange(false);
      router.push(`/${locale}${routes.dashboard}`);
    } catch (error) {
      console.error('Error creating tenant:', error);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('authPage.tenantModal.title')}</DialogTitle>
          <DialogDescription>
            {t('authPage.tenantModal.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="tenant-name">
              {t('authPage.tenantModal.fields.name.label')}{' '}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="tenant-name"
              type="text"
              placeholder={t('authPage.tenantModal.fields.name.placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={create.loading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tenant-email">
              {t('authPage.tenantModal.fields.email.label')}
            </Label>
            <Input
              id="tenant-email"
              type="email"
              placeholder={t('authPage.tenantModal.fields.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={create.loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tenant-description">
              {t('authPage.tenantModal.fields.description.label')}
            </Label>
            <Textarea
              id="tenant-description"
              placeholder={t(
                'authPage.tenantModal.fields.description.placeholder',
              )}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={create.loading}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={create.loading}
          >
            {t('authPage.tenantModal.actions.skip')}
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim() || create.loading}
          >
            {create.loading
              ? t('authPage.tenantModal.actions.creating')
              : t('authPage.tenantModal.actions.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
