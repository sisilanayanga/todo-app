interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateTodoDto {
  text: string;
}

interface UpdateTodoDto {
  text?: string;
  completed?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const todoApi = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todo with ID ${id}`);
    }
    return response.json();
  },

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTodoDto),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    return response.json();
  },

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTodoDto),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  },
};
