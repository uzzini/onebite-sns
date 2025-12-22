import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo, // 데이터 수정 요청 함수
    // 이벤트 핸들러 설정
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        },
      );
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
