import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/store/session";
import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();

  return useQuery({
    queryFn: () => fetchPostById({ postId, userId: session!.user.id }),
    queryKey: QUERY_KEYS.post.byId(postId),
    enabled: type === "FEED" ? false : true,
  });
}
