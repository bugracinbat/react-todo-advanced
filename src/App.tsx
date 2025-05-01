import { Provider } from "react-redux";
import { store } from "./store";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-screen bg-black text-white">
        <main className="w-full min-h-screen">
          <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                What To-Do
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                Organize your tasks with style
              </p>
            </div>
            <div className="space-y-4">
              <AddTodo />
              <TodoList />
            </div>
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
