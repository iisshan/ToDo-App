import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false); // Default: Show all tasks

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleSubmit = () => {
    if (todo.trim() === "") return;
    let newTodos = [...todos, { id: Date.now(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    let newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleEdit = (id) => {
    let editItem = todos.find((i) => i.id === id);
    if (editItem) {
      setTodo(editItem.todo);
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const toggleFinishedTasks = () => {
    setShowFinished(!showFinished);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-5">
          To-Do List
        </h2>

        {/* Input Section */}
        <div className="flex items-center space-x-2">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Enter a new task..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            disabled={todo.length <= 2}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-black"
          >
            Add
          </button>
        </div>

        {/* Toggle Completed Tasks */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinishedTasks}
            className="mr-2 w-5 h-5"
          />
          <span className="font-semibold text-gray-700">
            Show Only Completed Tasks
          </span>
        </div>

        {/* Todos Section */}
        <h3 className="text-xl font-semibold mt-6 text-gray-700">Your Tasks</h3>
        <div className="mt-4 space-y-3">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500">
              No todos to display 🚀
            </div>
          ) : (
            todos
              .filter((item) => (showFinished ? item.isCompleted : true)) // ✅ FIX: Only show completed if toggled
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                      className="w-5 h-5"
                    />
                    <span
                      className={`text-lg transition-all duration-300 ${
                        item.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.todo}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
