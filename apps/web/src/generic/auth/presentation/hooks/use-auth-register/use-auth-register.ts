import { AuthRegisterService } from '@/auth-context/auth/application/services/auth-register/auth-register.service';
import type { AuthRegisterByEmailFormValues } from '@/auth-context/auth/presentation/dtos/schemas/auth-register-by-email/auth-register-by-email.schema';
import { useAuth } from '@repo/sdk';
import { useMemo, useState } from 'react';

/**
 * Hook that provides registration functionality using the AuthRegisterService
 * Connects presentation layer to application layer following DDD pattern
 */
export function useAuthRegister() {
  const { registerByEmail } = useAuth();
  const [showTenantModal, setShowTenantModal] = useState(false);

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
        // Show tenant creation modal after successful registration
        setShowTenantModal(true);
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
    showTenantModal,
    setShowTenantModal,
  };
}
