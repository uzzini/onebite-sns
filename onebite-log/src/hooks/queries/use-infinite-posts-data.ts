import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "@/store/session";
import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";

const PAGE_SIZE = 5;

export function useInfinitePostsData(authorId?: string) {
  const queryClient = useQueryClient();

  const session = useSession();

  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({
        from,
        to,
        userId: session!.user.id,
        authorId,
      });
      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return posts.map((post) => post.id);
    },
    queryKey: !authorId
      ? QUERY_KEYS.post.list
      : QUERY_KEYS.post.userList(authorId),

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage : 가장 최근 페이지의 데이터 Post[]
      // allPages : 지금까지 불러온 모든 페이지의 데이터 Post[][]
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },

    staleTime: Infinity, // 캐시 데이터를 항상 fresh로 유지하여 자동 refetch 방지
  });
}
