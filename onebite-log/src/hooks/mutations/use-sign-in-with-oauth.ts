import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/api/auth";
import type { useMutationCallback } from "@/types";

export function useSignInWithOAuth(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
