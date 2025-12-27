import type { UserUpdateFormValues } from '@/generic/users/presentation/dtos/schemas/user-update/user-update.schema';
import type { UpdateUserInput } from '@repo/sdk';
import { useUsers } from '@repo/sdk';

/**
 * Hook that provides user update functionality
 * Uses SDK directly since backend handles all validation
 */
export function useUserUpdate() {
  const { update } = useUsers();

  const handleUpdate = async (
    values: UserUpdateFormValues,
    onSuccess?: () => void,
    onError?: (error: Error) => void,
  ) => {
    try {
      const input: UpdateUserInput = {
        id: values.id,
        name: values.name,
        lastName: values.lastName,
        userName: values.userName,
        bio: values.bio,
        avatarUrl: values.avatarUrl === '' ? undefined : values.avatarUrl,
        role: values.role,
        status: values.status,
      };

      const result = await update.mutate(input);

      if (result?.success) {
        onSuccess?.();
      }
    } catch (error) {
      const updateError =
        error instanceof Error ? error : new Error('User update failed');
      onError?.(updateError);
    }
  };

  return {
    handleUpdate,
    isLoading: update.loading,
    error: update.error,
  };
}
