import { useAuth } from '@repo/sdk';
import { useEffect } from 'react';

/**
 * Hook that provides authenticated user profile functionality
 * Uses SDK directly since backend handles all validation
 */
export function useAuthProfileMe(options?: { autoFetch?: boolean }) {
  const { profileMe } = useAuth();
  const autoFetch = options?.autoFetch ?? true;

  useEffect(() => {
    if (autoFetch) {
      profileMe.fetch();
    }
  }, [autoFetch]);

  return {
    profile: profileMe.data || null,
    isLoading: profileMe.loading,
    error: profileMe.error,
    refetch: () => {
      profileMe.fetch();
    },
  };
}
