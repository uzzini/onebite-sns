import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/auth";
import type { useMutationCallback } from "@/types";

export function useUpdatePassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
