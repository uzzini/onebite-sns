import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";

export function usePostsData() {
  return useQuery({
    queryFn: () => fetchPosts(),
    queryKey: QUERY_KEYS.post.list,
  });
}
