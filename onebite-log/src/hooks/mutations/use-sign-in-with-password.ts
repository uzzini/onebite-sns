import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "@/api/auth";
import type { useMutationCallback } from "@/types";

export function useSignInWithPassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
