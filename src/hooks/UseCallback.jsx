
import React, { useState, useCallback } from "react";

export default function UseCallback() {

  /* =====================================
     01. TODO MANAGER
  ===================================== */

  const [todos, setTodos] = useState([
    { id: 1, title: "Complete daily work", completed: false },
    { id: 2, title: "Practice JavaScript", completed: true },
    { id: 3, title: "Learn React Hooks", completed: false },
    { id: 4, title: "Read a programming book", completed: false },
    { id: 5, title: "Organize project files", completed: true },
    { id: 6, title: "Build a React project", completed: false },
    { id: 7, title: "Review today's lessons", completed: false },
    { id: 8, title: "Plan tomorrow's tasks", completed: false },
  ]);

  const [todoInput, setTodoInput] = useState("");
  const [todoSearch, setTodoSearch] = useState("");
  const [todoFilter, setTodoFilter] = useState("all");

  const addTodo = useCallback((event) => {
    event.preventDefault();

    const title = todoInput.trim();
    if (!title) return;

    setTodos((previous) => [
      ...previous,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);

    setTodoInput("");
  }, [todoInput]);

  const toggleTodo = useCallback((id) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((previous) =>
      previous.filter((todo) => todo.id !== id)
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((previous) =>
      previous.filter((todo) => !todo.completed)
    );
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(todoSearch.toLowerCase());

    const matchesFilter =
      todoFilter === "all" ||
      (todoFilter === "completed" && todo.completed) ||
      (todoFilter === "pending" && !todo.completed);

    return matchesSearch && matchesFilter;
  });


  /* =====================================
     02. SHOPPING LIST
  ===================================== */

  const [shopping, setShopping] = useState([
    { id: 1, name: "Rice", bought: false },
    { id: 2, name: "Milk", bought: true },
    { id: 3, name: "Eggs", bought: false },
    { id: 4, name: "Vegetables", bought: false },
    { id: 5, name: "Fruits", bought: false },
  ]);

  const [shoppingInput, setShoppingInput] = useState("");

  const addShopping = useCallback((event) => {
    event.preventDefault();

    const name = shoppingInput.trim();
    if (!name) return;

    setShopping((previous) => [
      ...previous,
      {
        id: Date.now(),
        name,
        bought: false,
      },
    ]);

    setShoppingInput("");
  }, [shoppingInput]);

  const toggleShopping = useCallback((id) => {
    setShopping((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, bought: !item.bought }
          : item
      )
    );
  }, []);

  const deleteShopping = useCallback((id) => {
    setShopping((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, []);

  const clearShopping = useCallback(() => {
    setShopping([]);
  }, []);


  /* =====================================
     03. HABIT TRACKER
  ===================================== */

  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 8 glasses of water", icon: "💧", done: false },
    { id: 2, name: "Read for 20 minutes", icon: "📚", done: true },
    { id: 3, name: "Exercise daily", icon: "🏃", done: false },
    { id: 4, name: "Practice coding", icon: "💻", done: false },
    { id: 5, name: "Sleep on time", icon: "🌙", done: true },
    { id: 6, name: "Spend time in nature", icon: "🌿", done: false },
  ]);

  const [habitInput, setHabitInput] = useState("");

  const addHabit = useCallback((event) => {
    event.preventDefault();

    const name = habitInput.trim();
    if (!name) return;

    setHabits((previous) => [
      ...previous,
      {
        id: Date.now(),
        name,
        icon: "⭐",
        done: false,
      },
    ]);

    setHabitInput("");
  }, [habitInput]);

  const toggleHabit = useCallback((id) => {
    setHabits((previous) =>
      previous.map((habit) =>
        habit.id === id
          ? { ...habit, done: !habit.done }
          : habit
      )
    );
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits((previous) =>
      previous.filter((habit) => habit.id !== id)
    );
  }, []);

  const resetHabits = useCallback(() => {
    setHabits((previous) =>
      previous.map((habit) => ({
        ...habit,
        done: false,
      }))
    );
  }, []);


  /* =====================================
     04. CONTACT MANAGER
  ===================================== */

  const [contacts, setContacts] = useState([
    { id: 1, name: "John Smith", phone: "01712345678" },
    { id: 2, name: "Sarah Ahmed", phone: "01812345678" },
    { id: 3, name: "Michael Brown", phone: "01912345678" },
    { id: 4, name: "Emily Wilson", phone: "01612345678" },
    { id: 5, name: "David Miller", phone: "01512345678" },
  ]);

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSearch, setContactSearch] = useState("");

  const addContact = useCallback((event) => {
    event.preventDefault();

    const name = contactName.trim();
    const phone = contactPhone.trim();

    if (!name || !phone) return;

    setContacts((previous) => [
      ...previous,
      {
        id: Date.now(),
        name,
        phone,
      },
    ]);

    setContactName("");
    setContactPhone("");
  }, [contactName, contactPhone]);

  const deleteContact = useCallback((id) => {
    setContacts((previous) =>
      previous.filter((contact) => contact.id !== id)
    );
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const query = contactSearch.toLowerCase();

    return (
      contact.name.toLowerCase().includes(query) ||
      contact.phone.includes(contactSearch)
    );
  });


  /* =====================================
     DASHBOARD CALCULATIONS
  ===================================== */

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const completedShopping = shopping.filter(
    (item) => item.bought
  ).length;

  const completedHabits = habits.filter(
    (habit) => habit.done
  ).length;

  const todoProgress = todos.length
    ? Math.round((completedTodos / todos.length) * 100)
    : 0;

  const habitProgress = habits.length
    ? Math.round((completedHabits / habits.length) * 100)
    : 0;


  /* =====================================
     MAIN UI
  ===================================== */

  return (
    <div className="min-h-screen bg-[#f7f5ff] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <header className="mb-9 text-center">

          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hook Playground
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-800 sm:text-4xl">
            useCallback Examples
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore multiple practical applications built
            with React useCallback Hook.
          </p>

        </header>


        {/* DASHBOARD */}

        <section className="mb-9 grid grid-cols-2 gap-4 lg:grid-cols-4">

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
            <p className="text-sm text-gray-500">Completed Tasks</p>
            <h2 className="mt-1 text-2xl font-extrabold text-green-600">
              {completedTodos}
            </h2>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl">
              🛒
            </div>
            <p className="text-sm text-gray-500">Shopping Items</p>
            <h2 className="mt-1 text-2xl font-extrabold text-blue-600">
              {shopping.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl">
              🎯
            </div>
            <p className="text-sm text-gray-500">Habits Completed</p>
            <h2 className="mt-1 text-2xl font-extrabold text-orange-600">
              {completedHabits}/{habits.length}
            </h2>
          </div>

        </section>


        {/* EXAMPLE 01: TODO MANAGER */}

        <section className="mb-8 rounded-3xl border border-purple-100 bg-white p-5 shadow-lg shadow-purple-100/50 sm:p-7">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Example 01
              </span>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                📋 Todo Manager
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add, search, filter and manage multiple tasks.
              </p>
            </div>

            <span className="rounded-xl bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
              {completedTodos}/{todos.length} Done
            </span>

          </div>


          <form
            onSubmit={addTodo}
            className="mb-5 flex flex-col gap-3 sm:flex-row"
          >

            <input
              value={todoInput}
              onChange={(event) => setTodoInput(event.target.value)}
              placeholder="Write a new task..."
              className="min-w-0 flex-1 rounded-xl border border-purple-200 bg-purple-50/50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-purple-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-purple-700 active:scale-95"
            >
              + Add Task
            </button>

          </form>


          {/* Progress */}

          <div className="mb-6 rounded-2xl bg-purple-50 p-4">

            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-gray-600">
                Overall Progress
              </span>

              <span className="font-bold text-purple-700">
                {todoProgress}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-purple-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${todoProgress}%` }}
              />
            </div>

          </div>


          {/* Search */}

          <input
            type="search"
            value={todoSearch}
            onChange={(event) => setTodoSearch(event.target.value)}
            placeholder="🔍 Search your tasks..."
            className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
          />


          {/* Filters */}

          <div className="mb-5 flex flex-wrap gap-2">

            {["all", "pending", "completed"].map((item) => (

              <button
                key={item}
                onClick={() => setTodoFilter(item)}
                className={`rounded-lg px-4 py-2 text-xs font-bold capitalize transition ${
                  todoFilter === item
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                {item}
              </button>

            ))}

            <button
              onClick={clearCompleted}
              className="ml-auto rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-500 transition hover:bg-red-100"
            >
              Clear Completed
            </button>

          </div>


          {/* Todo List */}

          <div className="space-y-3">

            {filteredTodos.length === 0 ? (

              <div className="rounded-xl border-2 border-dashed border-purple-100 py-10 text-center text-sm text-gray-400">
                No matching tasks found.
              </div>

            ) : (

              filteredTodos.map((todo) => (

                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 transition hover:border-purple-200 hover:bg-purple-50/40"
                >

                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      todo.completed
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 hover:border-purple-500"
                    }`}
                  >
                    {todo.completed ? "✓" : ""}
                  </button>

                  <span
                    className={`min-w-0 flex-1 break-words text-sm font-medium ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.title}
                  </span>

                  <span
                    className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:block ${
                      todo.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="rounded-lg px-3 py-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    ✕
                  </button>

                </div>

              ))

            )}

          </div>

        </section>



        {/* EXAMPLE 02: SHOPPING LIST */}

        <section className="mb-8 rounded-3xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-100/50 sm:p-7">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Example 02
              </span>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                🛒 Shopping List
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Organize your shopping items.
              </p>
            </div>

            <span className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              {completedShopping}/{shopping.length} Purchased
            </span>

          </div>


          <form
            onSubmit={addShopping}
            className="mb-5 flex flex-col gap-3 sm:flex-row"
          >

            <input
              value={shoppingInput}
              onChange={(event) => setShoppingInput(event.target.value)}
              placeholder="Enter shopping item..."
              className="min-w-0 flex-1 rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              + Add Item
            </button>

          </form>


          <div className="space-y-3">

            {shopping.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3"
              >

                <button
                  onClick={() => toggleShopping(item.id)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                    item.bought
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {item.bought ? "✓" : ""}
                </button>

                <span
                  className={`min-w-0 flex-1 text-sm font-medium ${
                    item.bought
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </span>

                <span className="text-xs font-semibold text-gray-400">
                  {item.bought ? "Purchased" : "Needed"}
                </span>

                <button
                  onClick={() => deleteShopping(item.id)}
                  className="rounded-lg px-2 py-1 text-red-400 hover:bg-red-50"
                >
                  ✕
                </button>

              </div>

            ))}

            {shopping.length === 0 && (
              <p className="rounded-xl bg-blue-50 py-8 text-center text-sm text-gray-400">
                Your shopping list is empty.
              </p>
            )}

          </div>

          {shopping.length > 0 && (
            <button
              onClick={clearShopping}
              className="mt-5 rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-100"
            >
              Clear Shopping List
            </button>
          )}

        </section>



        {/* EXAMPLE 03: HABIT TRACKER */}

        <section className="mb-8 rounded-3xl border border-green-100 bg-white p-5 shadow-lg shadow-green-100/50 sm:p-7">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                Example 03
              </span>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                🎯 Daily Habit Tracker
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Build better habits every day.
              </p>
            </div>

            <button
              onClick={resetHabits}
              className="rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-500 transition hover:bg-red-100"
            >
              Reset All
            </button>

          </div>


          {/* Habit Progress */}

          <div className="mb-6 rounded-2xl bg-green-50 p-5">

            <div className="mb-3 flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Today's Habit Progress
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-green-700">
                  {habitProgress}%
                </h3>
              </div>

              <div className="text-3xl">🌱</div>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-green-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
                style={{ width: `${habitProgress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {completedHabits} of {habits.length} habits completed
            </p>

          </div>


          {/* Add Habit */}

          <form
            onSubmit={addHabit}
            className="mb-5 flex flex-col gap-3 sm:flex-row"
          >

            <input
              value={habitInput}
              onChange={(event) => setHabitInput(event.target.value)}
              placeholder="Add a new daily habit..."
              className="min-w-0 flex-1 rounded-xl border border-green-200 bg-green-50/40 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-green-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              + Add Habit
            </button>

          </form>


          {/* Habit List */}

          <div className="space-y-3">

            {habits.map((habit) => (

              <div
                key={habit.id}
                className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                  habit.done
                    ? "border-green-200 bg-green-50"
                    : "border-gray-100 bg-white hover:border-green-200"
                }`}
              >

                <button
                  onClick={() => toggleHabit(habit.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >

                  <span className="text-2xl">{habit.icon}</span>

                  <span>
                    <span className={`block text-sm font-bold ${
                      habit.done ? "text-green-700" : "text-gray-700"
                    }`}>
                      {habit.name}
                    </span>

                    <span className="mt-1 block text-xs text-gray-400">
                      {habit.done ? "Completed today" : "Not completed yet"}
                    </span>
                  </span>

                </button>

                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    habit.done
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {habit.done ? "✓" : "+"}
                </button>

                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="rounded-lg px-2 py-1 text-red-400 hover:bg-red-50"
                >
                  ✕
                </button>

              </div>

            ))}

          </div>

        </section>



        {/* EXAMPLE 04: CONTACT MANAGER */}

        <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/50 sm:p-7">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Example 04
              </span>

              <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                📞 Contact Manager
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Save, search and manage your contacts.
              </p>
            </div>

            <span className="rounded-xl bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
              {contacts.length} Contacts
            </span>

          </div>


          {/* Add Contact */}

          <form
            onSubmit={addContact}
            className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >

            <input
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              placeholder="Contact name"
              required
              className="min-w-0 rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <input
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
              placeholder="Phone number"
              required
              type="tel"
              className="min-w-0 rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 sm:col-span-2"
            >
              + Save Contact
            </button>

          </form>


          {/* Search Contact */}

          <input
            type="search"
            value={contactSearch}
            onChange={(event) => setContactSearch(event.target.value)}
            placeholder="🔍 Search by name or phone..."
            className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
          />


          {/* Contact List */}

          <div className="space-y-3">

            {filteredContacts.map((contact) => (

              <div
                key={contact.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-orange-200 hover:bg-orange-50/40"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  {contact.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-bold text-gray-700">
                    {contact.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {contact.phone}
                  </p>

                </div>

                <button
                  onClick={() => deleteContact(contact.id)}
                  className="rounded-lg px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            ))}

            {filteredContacts.length === 0 && (
              <p className="rounded-xl bg-orange-50 py-8 text-center text-sm text-gray-400">
                No contacts found.
              </p>
            )}

          </div>

        </section>


        {/* FOOTER */}

        <footer className="mt-9 text-center">

          <p className="text-sm font-semibold text-gray-500">
            Built with React useCallback Hook
          </p>

          <p className="mt-1 text-xs text-gray-400">
            4 Practical Examples • Multiple Callback Functions
          </p>

        </footer>

      </div>
    </div>
  );
}
