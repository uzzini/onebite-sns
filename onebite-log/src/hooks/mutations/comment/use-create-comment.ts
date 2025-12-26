import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createComment } from "@/api/comment";
import { useSession } from "@/store/session";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import type { useMutationCallback, Comment } from "@/types";
import { QUERY_KEYS } from "@/lib/constants";

export function useCreateComment(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(newComment.post_id),
        (comments) => {
          if (!comments)
            throw Error("댓글이 캐시 데이터에 보관되어 있지 않습니다.");
          if (!profile) throw Error("사용자의 프로필 정보를 찾을 수 없습니다.");

          return [...comments, { ...newComment, author: profile }];
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
