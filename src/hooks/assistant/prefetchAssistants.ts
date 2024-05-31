import { assistantApi } from '@/services/react-query/apis/assistant.api';
import { QueryClient, dehydrate } from '@tanstack/react-query';

// Pre-fetch assistants data
export async function prefetchAssistants() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['assistants'],
    queryFn: () => assistantApi.getAssistants(),
  });
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
}
