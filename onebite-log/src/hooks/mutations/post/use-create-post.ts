import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPostWithImages } from "@/api/post";
import type { useMutationCallback } from "@/types";
import { QUERY_KEYS } from "@/lib/constants";

export function useCreatePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
