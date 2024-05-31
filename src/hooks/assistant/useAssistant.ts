'use client';

import { assistantApi } from '@/services/react-query/apis/assistant.api';
import useAssistantStore from '@/store/assistantStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const useAssistant = (assistantId?: string) => {
  const {
    userInfo,
    thread,
    assistant,
    message,
    attachedFiles,
    conversations,
    isLoading,
    setThread,
    setAssistant,
    setMessage,
    setAttachedFiles,
    setConversations,
    addConversations,
    setUserInfo,
    deleteUserInfo,
    setIsLoading,
  } = useAssistantStore();

  const queryClient = useQueryClient();
  const assistantsResult = queryClient.getQueryData<{
    isSuccess: boolean;
    results: any[];
  }>(['assistants']);
  const assistantsQuery = useQuery<{ isSuccess: boolean; results: any[] }>({
    queryKey: ['assistants'],
    queryFn: () => assistantApi.getAssistants(),
    initialData: assistantsResult,
  });

  const threadQuery = useQuery<{
    isSuccess: boolean;
    results: { id: string };
  }>({
    queryKey: ['thread', 'create'],
    queryFn: () => assistantApi.getThread(),
  });

  // 쓰레드를 생성
  useEffect(() => {
    if (threadQuery.isSuccess && threadQuery.data) {
      setThread(threadQuery.data.results.id);
    }
  }, [threadQuery.isSuccess, threadQuery.data, setThread]);

  useEffect(() => {
    if (assistantsQuery.isSuccess && assistantId) {
      const foundAssistant = assistantsQuery.data.results.find(
        (v) => v.id === assistantId,
      );
      if (foundAssistant) {
        setAssistant(foundAssistant);
      }
    }
  }, [
    assistantsQuery.isSuccess,
    assistantsQuery.data,
    setAssistant,
    assistantId,
  ]);

  return {
    assistants: assistantsResult?.results ?? [],
    assistantsQuery,
    threadQuery,
    userInfo,
    thread,
    assistant,
    message,
    attachedFiles,
    conversations,
    isLoading,
    setThread,
    setAssistant,
    setMessage,
    setAttachedFiles,
    setConversations,
    addConversations,
    setUserInfo,
    deleteUserInfo,
    setIsLoading,
  };
};

export default useAssistant;
