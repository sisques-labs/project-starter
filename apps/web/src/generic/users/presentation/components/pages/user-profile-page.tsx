'use client';

import { UserUpdateForm } from '@/generic/users/presentation/components/organisms/user-update-form/user-update-form';
import type { UserUpdateFormValues } from '@/generic/users/presentation/dtos/schemas/user-update/user-update.schema';
import { useUserFindById } from '@/generic/users/presentation/hooks/use-user-find-by-id/use-user-find-by-id';
import { useUserUpdate } from '@/generic/users/presentation/hooks/use-user-update/use-user-update';
import { useTranslations } from 'next-intl';

export function UserProfilePage() {
  const t = useTranslations();
  const {
    user,
    isLoading: isLoadingUser,
    error: userError,
    refetch,
  } = useUserFindById(userId);
  const {
    handleUpdate,
    isLoading: isUpdating,
    error: updateError,
  } = useUserUpdate();

  const handleSubmit = async (values: UserUpdateFormValues) => {
    await handleUpdate(values, () => {
      // Refetch user data after successful update
      refetch();
    });
  };

  if (isLoadingUser) {
    return <div>{t('user.loading')}</div>;
  }

  if (userError) {
    return <div>{t('user.error.loading', { message: userError.message })}</div>;
  }

  if (!user) {
    return <div>{t('user.notFound')}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('user.profile.title')}</h1>
      <UserUpdateForm
        user={user}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        error={updateError}
      />
    </div>
  );
}
