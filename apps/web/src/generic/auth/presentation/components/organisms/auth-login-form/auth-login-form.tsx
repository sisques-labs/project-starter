'use client';

import { AuthEmailField } from '@/auth-context/auth/presentation/components/molecules/auth-email-field/auth-email-field';
import { AuthErrorMessage } from '@/auth-context/auth/presentation/components/molecules/auth-error-message/auth-error-message';
import { AuthPasswordField } from '@/auth-context/auth/presentation/components/molecules/auth-password-field/auth-password-field';
import { AuthSubmitButton } from '@/auth-context/auth/presentation/components/molecules/auth-submit-button/auth-submit-button';
import {
  AuthLoginByEmailFormValues,
  createAuthLoginByEmailSchema,
} from '@/auth-context/auth/presentation/dtos/schemas/auth-login-by-email/auth-login-by-email.schema';
import { useAuthPageStore } from '@/auth-context/auth/presentation/stores/auth-page-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/shared/presentation/components/ui/form';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface AuthLoginFormProps {
  onSubmit: (values: AuthLoginByEmailFormValues) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export function AuthLoginForm({
  onSubmit,
  isLoading,
  error,
}: AuthLoginFormProps) {
  const t = useTranslations();
  const { email, password, setEmail, setPassword } = useAuthPageStore();

  // Create schema with translations
  const loginSchema = useMemo(
    () => createAuthLoginByEmailSchema((key: string) => t(key)),
    [t],
  );

  // Login form - initialized with store values
  const form = useForm<AuthLoginByEmailFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: email,
      password: password,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AuthEmailField
          control={form.control}
          name="email"
          disabled={isLoading}
          onEmailChange={setEmail}
        />
        <AuthPasswordField
          control={form.control}
          name="password"
          disabled={isLoading}
          placeholder="login"
          onPasswordChange={setPassword}
        />
        <AuthErrorMessage error={error} />
        <AuthSubmitButton
          isLoading={isLoading}
          disabled={isLoading}
          mode="login"
        />
      </form>
    </Form>
  );
}
