import { useState, useId } from "react";

/* =========================================
   EXAMPLE 01: INTERACTIVE COUNTER 🌲
   (useState দিয়ে সংখ্যা বাড়ানো এবং কমানো)
========================================= */

function CounterExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Interactive Counter State
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Managing simple numeric state updates using <code className="text-purple-600">useState</code>.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-purple-50/50 p-5 text-center">
        <p className="text-xs font-bold text-gray-500">Current Count Value</p>
        <p className="text-3xl font-extrabold text-purple-700 mt-1">{count}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="flex-1 rounded-xl bg-purple-100 px-3 py-2.5 text-xs font-bold text-purple-700 hover:bg-purple-200 transition"
        >
          Decrease (-)
        </button>
        <button
          onClick={() => setCount(0)}
          className="rounded-xl bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
        >
          Reset
        </button>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="flex-1 rounded-xl bg-purple-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-purple-700 transition"
        >
          Increase (+)
        </button>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: THEME TOGGLER 🍃
   (useState দিয়ে ডার্ক ও লাইট থিম পরিবর্তন করা)
========================================= */

function ThemeToggleExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`rounded-3xl border p-6 shadow-lg transition duration-300 flex flex-col justify-between ${
      isDarkMode ? "border-gray-700 bg-gray-900 text-white" : "border-green-100 bg-white text-gray-800"
    }`}>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-500">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold">
          Boolean State Toggler
        </h2>
        <p className={`mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
          Toggling UI appearance dynamically with boolean states.
        </p>
      </div>

      <div className={`my-5 rounded-2xl p-5 text-center transition ${isDarkMode ? "bg-gray-800 text-green-400" : "bg-green-50 text-green-700"}`}>
        <p className="text-sm font-extrabold">
          Current Theme: {isDarkMode ? "Dark Forest 🌙" : "Bright Nature ☀️"}
        </p>
      </div>

      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold transition ${
          isDarkMode ? "bg-green-500 text-gray-900 hover:bg-green-400" : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Toggle Theme Mode
      </button>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: PROFILE BIO EDITOR 🌊
   (useState দিয়ে ইনপুট ফর্ম ও টেক্সট স্টেট কন্ট্রোল)
========================================= */

function ProfileBioExample() {
  const [bio, setBio] = useState("Exploring MERN stack development and nature serenity.");
  const [isEditing, setIsEditing] = useState(false);
  const bioInputId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Profile Bio Text Editor
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Managing string states and conditional UI editing modes.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-blue-50/50 p-5 space-y-3">
        <p className="text-xs font-bold text-gray-500">User Bio Preview:</p>
        
        {!isEditing ? (
          <p className="text-sm font-semibold text-blue-900 bg-white p-4 rounded-xl border border-blue-100">
            "{bio}"
          </p>
        ) : (
          <div className="space-y-2">
            <label htmlFor={bioInputId} className="block text-[11px] font-bold text-gray-600">
              Edit Bio Text:
            </label>
            <textarea
              id={bioInputId}
              rows="2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-xl border border-blue-200 bg-white p-3 text-xs text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
        >
          {isEditing ? "Save Changes 💾" : "Edit Bio ✍️"}
        </button>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseState() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useState</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            The fundamental hook for adding local state memory and reactive UI updates in React functional components.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CounterExample />
          <ThemeToggleExample />
          <ProfileBioExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useState</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}