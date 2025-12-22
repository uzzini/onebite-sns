import { Link } from "react-router";
import { useTodoDataById } from "@/hooks/queries/use-todos-data-by-id";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { Button } from "../ui/button";
import type { Todo } from "@/types";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, "LIST");
  if (!todo) throw new Error("Todo Data Undefined");
  const { content, isDone } = todo;

  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();

  const handleCheckboxClick = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type={"checkbox"}
          checked={isDone}
          onClick={handleCheckboxClick}
          disabled={isDeleteTodoPending}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant={"destructive"}
        onClick={handleDeleteClick}
        disabled={isDeleteTodoPending}
      >
        삭제
      </Button>
    </div>
  );
}
