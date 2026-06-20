import { useState, useEffect } from "react";
import "./App.css";
import { todoApi } from "./services/todoApi";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // LOAD: Fetch todos on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await todoApi.getAllTodos();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load todos");
        console.error("Error loading todos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // CREATE: Add a new todo
  const addTodo = async () => {
    if (inputValue.trim()) {
      try {
        setError(null);
        const newTodo = await todoApi.createTodo({ text: inputValue });
        setTodos([newTodo, ...todos]);
        setInputValue("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create todo");
        console.error("Error creating todo:", err);
      }
    }
  };

  // UPDATE: Toggle todo completion status
  const toggleComplete = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      console.error("Error updating todo:", err);
    }
  };

  // UPDATE: Edit todo text
  const editTodo = async (id: number, newText: string) => {
    if (!newText.trim()) return;

    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, { text: newText });
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to edit todo");
      console.error("Error editing todo:", err);
    }
  };

  // DELETE: Remove a todo
  const deleteTodo = async (id: number) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="app-container">
      <section className="todo-section">
        <h1>📝 Todo App</h1>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "#fee",
              color: "#c00",
              border: "1px solid #fcc",
              borderRadius: "4px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Loading todos...</p>
        ) : (
          <>
            {/* Input Section */}
            <div className="input-section">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                placeholder="Add a new todo..."
                className="todo-input"
              />
              <button onClick={addTodo} className="add-button">
                Add Todo
              </button>
            </div>

            {/* Stats Section */}
            {todos.length > 0 && (
              <div className="stats">
                <p>
                  Total: {todos.length} | Completed:{" "}
                  {todos.filter((todo) => todo.completed).length} | Remaining:{" "}
                  {todos.filter((todo) => !todo.completed).length}
                </p>
              </div>
            )}

            {/* Todo List Section */}
            <div className="todo-list">
              {todos.length === 0 ? (
                <p className="empty-message">
                  No todos yet. Add one to get started! 🚀
                </p>
              ) : (
                <ul>
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className={`todo-item ${todo.completed ? "completed" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        className="todo-checkbox"
                      />
                      <input
                        type="text"
                        value={todo.text}
                        onChange={(e) => editTodo(todo.id, e.target.value)}
                        className="todo-text"
                      />
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="delete-button"
                        title="Delete todo"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
