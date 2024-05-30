// src/api/mutations/useCreatePostMutation.ts
import { useMutation, useQueryClient } from 'react-query';
import { createPost } from '../apis/api';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};
