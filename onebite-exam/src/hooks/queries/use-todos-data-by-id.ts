import { useQuery } from "@tanstack/react-query";
import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEYS } from "@/lib/constants";

export function useTodoDataById(id: string, type: "LIST" | "DETAIL") {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    enabled: type === "DETAIL", // type 매개변수의 값이 DETAIL로 제공되었을 때만 refetch 발생

    // refetch 발생 여부 설정 가능
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchInterval: false
  });
}
