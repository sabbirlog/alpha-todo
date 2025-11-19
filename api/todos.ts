import api from "@/lib/axios";

export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  is_completed: boolean;
  position: number;
  todo_date: string;
  created_at: string;
  updated_at: string;
}


export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get(`/api/todos/`);
  return res.data || [];
};

export const deleteTodos = async (id: number): Promise<Todo[]> => {
  const res = await api.delete(`/api/todos/${id}/`);
  return res.data || [];
};
