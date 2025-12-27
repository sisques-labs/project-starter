import { AuthRegisterService } from '@/generic/auth/application/services/auth-register/auth-register.service';
import type { AuthRegisterByEmailFormValues } from '@/generic/auth/presentation/dtos/schemas/auth-register-by-email/auth-register-by-email.schema';
import { useRoutes } from '@/shared/presentation/hooks/use-routes';
import { useAuth } from '@repo/sdk';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

/**
 * Hook that provides registration functionality using the AuthRegisterService
 * Connects presentation layer to application layer following DDD pattern
 */
export function useAuthRegister() {
  const router = useRouter();
  const locale = useLocale();
  const { routes } = useRoutes();
  const { registerByEmail } = useAuth();

  // Create service instance with SDK register client
  const registerService = useMemo(
    () =>
      new AuthRegisterService({
        registerByEmail: async (input) => {
          const result = await registerByEmail.fetch(input);
          return result || null;
        },
      }),
    [registerByEmail],
  );

  const handleRegister = async (values: AuthRegisterByEmailFormValues) => {
    await registerService.execute({
      credentials: {
        email: values.email,
        password: values.password,
      },
      onSuccess: () => {
        router.push(`/${locale}${routes.dashboard}`);
      },
      onError: (error) => {
        // Error handling is delegated to the SDK hook state
        console.error('Registration error:', error);
      },
    });
  };

  return {
    handleRegister,
    isLoading: registerByEmail.loading,
    error: registerByEmail.error,
  };
}
