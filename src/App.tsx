import { Provider } from "react-redux";
import { store } from "./store";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Advanced Todo App
          </h1>
          <div className="space-y-6">
            <AddTodo />
            <TodoList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
