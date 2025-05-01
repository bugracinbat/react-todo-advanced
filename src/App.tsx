import { Provider } from "react-redux";
import { store } from "./store";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative animate-dark-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] animate-grid" />
        <div className="absolute inset-0 digital-rain opacity-[0.07]" />
        <main className="w-full min-h-screen relative">
          <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2 animate-gradient">
                What To-Do
              </h1>
              <p className="text-base sm:text-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
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
