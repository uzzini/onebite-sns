import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    // 캐시 정규화
    queryFn: async () => {
      const todos = await fetchTodos();

      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });

      return todos.map((todo) => todo.id);
    }, // 데이터 요청 함수 ( 컴포넌트 마운트 시 자동 실행 )
    queryKey: QUERY_KEYS.todo.list, // 해당 쿼리를 식별하기 위한 캐시 키
  });
}
