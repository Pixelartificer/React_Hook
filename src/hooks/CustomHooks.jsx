import { useState, useEffect, useId } from "react";

/* =========================================
   CUSTOM HOOK 01: useLocalStorage 🌲
   (লোকাল স্টোরেজে ডেটা সেভ ও সিঙ্ক করার কাস্টম হুক)
========================================= */

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

function LocalStorageHookExample() {
  const [name, setName] = useLocalStorage("nature_username", "Enrique");
  const inputId = useId();

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Custom Hook 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          useLocalStorage Hook
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Persisting state automatically across page reloads using a custom hook.
        </p>
      </div>

      <div className="my-5 space-y-3">
        <p className="text-xs font-semibold text-gray-600">
          Saved Username: <strong className="text-purple-700">{name}</strong>
        </p>
        <div>
          <label htmlFor={inputId} className="block text-xs font-bold text-gray-700 mb-1">
            Update Name
          </label>
          <input
            id={inputId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-xs focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}


/* =========================================
   CUSTOM HOOK 02: useCounter 🍃
   (কাউন্টার লজিক আলাদা করে রিইউজ করার কাস্টম হুক)
========================================= */

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

function CounterHookExample() {
  const { count, increment, decrement, reset } = useCounter(5, 2);

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Custom Hook 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          useCounter Hook
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Encapsulating state logic for reusable increment/decrement operations.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-green-50/50 p-4 text-center">
        <p className="text-xs font-bold text-gray-500">Counter Value (Step: 2)</p>
        <p className="text-3xl font-extrabold text-green-700 mt-1">{count}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="flex-1 rounded-xl bg-green-100 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-200"
        >
          Decrease (-)
        </button>
        <button
          onClick={reset}
          className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="flex-1 rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
        >
          Increase (+)
        </button>
      </div>
    </div>
  );
}


/* =========================================
   CUSTOM HOOK 03: useWindowWidth 🌊
   (স্ক্রিন উইডথ ট্র্যাক করার কাস্টম হুক)
========================================= */

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

function WindowWidthHookExample() {
  const width = useWindowWidth();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Custom Hook 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          useWindowWidth Hook
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Tracking window resize dimensions reactively across components.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-blue-50 p-5 text-center flex flex-col justify-center space-y-1">
        <p className="text-xs font-bold text-gray-500">Current Screen Width</p>
        <p className="text-3xl font-extrabold text-blue-900">{width}px</p>
        <p className="text-[11px] text-blue-600 font-semibold mt-1">
          {width < 768 ? "📱 Mobile Screen Layout" : "💻 Desktop Screen Layout"}
        </p>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function CustomHooks() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">Custom Hooks</code>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Extract component logic into reusable functions to keep code clean and modular.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <LocalStorageHookExample />
          <CounterHookExample />
          <WindowWidthHookExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React Custom Hooks • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}