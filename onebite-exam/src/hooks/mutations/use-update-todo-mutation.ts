import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    // 낙관적 업데이트
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      // 업데이트 이전 원본 캐시 데이터 저장
      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            ...prevTodo,
            ...updatedTodo,
          };
        },
      );

      return {
        prevTodo,
      };
    },
    // 요청 실패 시
    onError: (error, variable, context) => {
      // 낙관적 업데이트 이전 상태로 데이터 복구
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
  });
}
