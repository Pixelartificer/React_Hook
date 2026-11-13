import { useActionState } from "react";


/* =================================
   TODO MANAGER
================================= */

const initialTodos = [
  { id: 1, title: "Complete daily work", completed: false },
  { id: 2, title: "Practice React Hooks", completed: true },
  { id: 3, title: "Read JavaScript documentation", completed: false },
  { id: 4, title: "Organize project files", completed: false },
  { id: 5, title: "Review today's tasks", completed: false },
];

function todoReducer(previousTodos, formData) {
  const type = formData.get("type");

  if (type === "add") {
    const title = formData.get("title")?.trim();

    if (!title) return previousTodos;

    return [
      ...previousTodos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ];
  }

  if (type === "toggle") {
    const id = Number(formData.get("id"));

    return previousTodos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
  }

  if (type === "delete") {
    const id = Number(formData.get("id"));

    return previousTodos.filter((todo) => todo.id !== id);
  }

  return previousTodos;
}


/* =================================
   EXPENSE TRACKER
================================= */

const initialExpenses = [
  { id: 1, title: "Groceries", amount: 1500, category: "Food" },
  { id: 2, title: "Transportation", amount: 500, category: "Travel" },
  { id: 3, title: "Internet Bill", amount: 1000, category: "Bills" },
];

function expenseReducer(previousExpenses, formData) {
  const type = formData.get("type");

  if (type === "add") {
    const title = formData.get("title")?.trim();
    const amount = Number(formData.get("amount"));
    const category = formData.get("category");

    if (!title || !Number.isFinite(amount) || amount <= 0) {
      return previousExpenses;
    }

    return [
      ...previousExpenses,
      {
        id: Date.now(),
        title,
        amount,
        category,
      },
    ];
  }

  if (type === "delete") {
    const id = Number(formData.get("id"));

    return previousExpenses.filter(
      (expense) => expense.id !== id
    );
  }

  return previousExpenses;
}


/* =================================
   MAIN COMPONENT
================================= */

export default function UseActionState() {

  // Todo useActionState
  const [todos, todoAction, todoPending] = useActionState(
    todoReducer,
    initialTodos
  );

  // Expense useActionState
  const [expenses, expenseAction, expensePending] = useActionState(
    expenseReducer,
    initialExpenses
  );

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remainingTodos = todos.length - completedTodos;

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);


  return (
    <div className="min-h-screen bg-[#f7f5ff] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-9 text-center">

          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React 19 • Hook Playground
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-800 sm:text-4xl">
            useActionState Examples
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore two practical applications using React's
            useActionState Hook.
          </p>

        </div>


        {/* DASHBOARD CARDS */}

        <div className="mb-9 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl">
              📋
            </div>
            <p className="text-sm text-gray-500">Total Tasks</p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
              {todos.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-xl">
              ✓
            </div>
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="mt-1 text-2xl font-extrabold text-green-600">
              {completedTodos}
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl">
              💳
            </div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <h2 className="mt-1 break-all text-xl font-extrabold text-gray-800">
              {formatMoney(totalExpenses)}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl">
              🧾
            </div>
            <p className="text-sm text-gray-500">Expense Records</p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
              {expenses.length}
            </h2>
          </div>

        </div>


        {/* TODO MANAGER */}

        <section className="mb-9 rounded-3xl border border-purple-100 bg-white p-5 shadow-lg shadow-purple-100/50 sm:p-7">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Example 01
              </span>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                📋 Todo Manager
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your daily tasks.
              </p>
            </div>

            <span className="rounded-xl bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
              {remainingTodos} Remaining
            </span>

          </div>


          {/* Add Task Form */}

          <form
            action={todoAction}
            className="mb-6 flex flex-col gap-3 sm:flex-row"
          >

            <input type="hidden" name="type" value="add" />

            <input
              type="text"
              name="title"
              required
              placeholder="Enter a new task..."
              className="min-w-0 flex-1 rounded-xl border border-purple-200 bg-purple-50/50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

            <button
              type="submit"
              disabled={todoPending}
              className="rounded-xl bg-purple-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-purple-700 active:scale-95 disabled:opacity-50"
            >
              + Add Task
            </button>

          </form>


          {/* Todo Progress */}

          <div className="mb-6 rounded-2xl bg-purple-50 p-4">

            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-gray-600">
                Task Progress
              </span>

              <span className="font-bold text-purple-700">
                {todos.length
                  ? Math.round((completedTodos / todos.length) * 100)
                  : 0}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-purple-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{
                  width: `${
                    todos.length
                      ? (completedTodos / todos.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

          </div>


          {/* Todo List */}

          <div className="space-y-3">

            {todos.length === 0 ? (
              <p className="rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-400">
                No tasks available. Add your first task!
              </p>
            ) : (

              todos.map((todo, index) => (

                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-purple-200 hover:bg-purple-50/40 sm:p-4"
                >

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-xs font-bold text-purple-700">
                    {index + 1}
                  </span>


                  <form action={todoAction}>
                    <input type="hidden" name="type" value="toggle" />
                    <input
                      type="hidden"
                      name="id"
                      value={todo.id}
                    />

                    <button
                      type="submit"
                      disabled={todoPending}
                      aria-label="Toggle task completion"
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                        todo.completed
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 hover:border-purple-500"
                      }`}
                    >
                      {todo.completed ? "✓" : ""}
                    </button>
                  </form>


                  <span
                    className={`min-w-0 flex-1 break-words text-sm font-medium ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.title}
                  </span>


                  <span className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:block ${
                    todo.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-600"
                  }`}>
                    {todo.completed ? "Done" : "Pending"}
                  </span>


                  <form action={todoAction}>
                    <input type="hidden" name="type" value="delete" />
                    <input
                      type="hidden"
                      name="id"
                      value={todo.id}
                    />

                    <button
                      type="submit"
                      disabled={todoPending}
                      aria-label="Delete task"
                      className="rounded-lg px-3 py-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </form>

                </div>

              ))

            )}

          </div>

          {todoPending && (
            <p className="mt-4 text-center text-xs text-purple-500">
              Updating tasks...
            </p>
          )}

        </section>



        {/* EXPENSE TRACKER */}

        <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-100/50 sm:p-7">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Example 02
              </span>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                💳 Expense Tracker
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track and manage your daily expenses.
              </p>
            </div>

            <span className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              {expenses.length} Records
            </span>

          </div>


          {/* Total Expense */}

          <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">

            <p className="text-sm font-medium text-blue-100">
              Total Money Spent
            </p>

            <h3 className="mt-2 break-all text-3xl font-extrabold">
              {formatMoney(totalExpenses)}
            </h3>

            <p className="mt-2 text-xs text-blue-100">
              Across all recorded expenses
            </p>

          </div>


          {/* Add Expense Form */}

          <form
            action={expenseAction}
            className="mb-7 rounded-2xl border border-blue-100 bg-blue-50/40 p-4 sm:p-5"
          >

            <input type="hidden" name="type" value="add" />

            <h3 className="mb-4 font-bold text-gray-800">
              + Add New Expense
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <input
                type="text"
                name="title"
                required
                placeholder="Expense name"
                className="min-w-0 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <input
                type="number"
                name="amount"
                required
                min="1"
                step="any"
                placeholder="Amount (BDT)"
                className="min-w-0 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <select
                name="category"
                className="min-w-0 rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:col-span-2"
              >
                <option value="Food">🍔 Food</option>
                <option value="Travel">🚗 Travel</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Bills">🧾 Bills</option>
                <option value="Education">📚 Education</option>
                <option value="Other">📦 Other</option>
              </select>

            </div>

            <button
              type="submit"
              disabled={expensePending}
              className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50"
            >
              + Add Expense
            </button>

          </form>


          {/* Expense List */}

          <div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">
                Recent Expenses
              </h3>

              <span className="text-xs font-medium text-gray-400">
                {expenses.length} Items
              </span>
            </div>


            {expenses.length === 0 ? (

              <div className="rounded-xl border-2 border-dashed border-blue-100 py-10 text-center">
                <div className="mb-2 text-3xl">🧾</div>
                <p className="text-sm text-gray-500">
                  No expenses added yet.
                </p>
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[500px] text-left">

                  <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                      <th className="px-3 py-3">Expense</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Amount</th>
                      <th className="px-3 py-3 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {expenses.map((expense) => (

                      <tr
                        key={expense.id}
                        className="border-b border-gray-50 transition hover:bg-blue-50/40"
                      >

                        <td className="px-3 py-4 text-sm font-semibold text-gray-700">
                          {expense.title}
                        </td>

                        <td className="px-3 py-4">
                          <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            {expense.category}
                          </span>
                        </td>

                        <td className="px-3 py-4 text-sm font-bold text-gray-800">
                          {formatMoney(expense.amount)}
                        </td>

                        <td className="px-3 py-4 text-right">

                          <form action={expenseAction}>
                            <input
                              type="hidden"
                              name="type"
                              value="delete"
                            />

                            <input
                              type="hidden"
                              name="id"
                              value={expense.id}
                            />

                            <button
                              type="submit"
                              disabled={expensePending}
                              className="rounded-lg px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </form>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {expensePending && (
            <p className="mt-4 text-center text-xs text-blue-500">
              Updating expenses...
            </p>
          )}

        </section>


        {/* FOOTER */}

        <footer className="mt-8 text-center">

          <p className="text-sm font-semibold text-gray-500">
            Built with React useActionState Hook
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Two practical examples • One powerful React Hook
          </p>

        </footer>

      </div>
    </div>
  );
}
