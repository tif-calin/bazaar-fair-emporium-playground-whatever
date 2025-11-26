import React from 'react';
import CladeTablePage from "./CladeTablePage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const WithQueryClient = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CladeTablePage />
    </QueryClientProvider>
  );
};

export default React.memo(WithQueryClient);
