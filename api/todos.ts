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

export interface TodosResponse {
  results: Todo[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}


export const getTodos = async (todo_date?: string): Promise<TodosResponse> => {
  const res = await api.get("/api/todos/", {
    params: todo_date ? { todo_date } : {},
  });
  return res.data || [];
};


export const deleteTodo = async (id: number): Promise<Todo[]> => {
  const res = await api.delete(`/api/todos/${id}/`);
  return res.data || [];
};

export const createTodo = async (formData: FormData): Promise<Todo[]> => {
  const res = await api.post(`/api/todos/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data || [];
};

export const updateTodo = async (id: number, formData: FormData): Promise<Todo[]> => {
  const res = await api.patch(`/api/todos/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data || [];
};

