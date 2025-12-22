import { useTodosData } from "@/hooks/queries/use-todos-data";
import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";

export default function TodoListPage() {
  const { data: todoIds, isLoading, error } = useTodosData();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {todoIds?.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </div>
  );
}
