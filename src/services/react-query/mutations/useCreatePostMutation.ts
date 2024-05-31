// src/api/mutations/useCreatePostMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../apis/api';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
