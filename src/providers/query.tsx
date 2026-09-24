import type { ReactNode } from 'react';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { logger } from '../utils/logger';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      logger.error(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      logger.error(error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
};
