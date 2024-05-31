import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import React from 'react';
import { getAssistants } from '../api/assistant/assistantAPI';
import { prefetchAssistants } from '@/hooks/assistant/prefetchAssistants';

export const metadata: Metadata = {
  title: 'assistant',
  description: 'assistant',
};

export default async function AssistantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ['assistant'],
  //   queryFn: getAssistants,
  // });
  // const dehydratedState = dehydrate(queryClient);
  const dehydratedState = await prefetchAssistants();
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
