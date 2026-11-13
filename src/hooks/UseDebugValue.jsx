import React, { useState, useEffect, useDebugValue } from "react";

/* =========================================
   01. CUSTOM HOOK: useOnlineStatus 🟢
========================================= */
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  // DevTools এ দেখাবে ইউজার অনলাইন নাকি অফলাইন
  useDebugValue(isOnline ? "Status: Online 🟢" : "Status: Offline 🔴");

  const toggleStatus = () => setIsOnline((prev) => !prev);
  return { isOnline, toggleStatus };
}


/* =========================================
   02. CUSTOM HOOK: useCounter 🔢
========================================= */
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  // DevTools এ দেখাবে কাউন্টটি Even নাকি Odd (Formatting function সহ)
  useDebugValue(count, (val) => `Count is ${val} (${val % 2 === 0 ? "Even" : "Odd"})`);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}


/* =========================================
   03. CUSTOM HOOK: useWindowSize 📐
========================================= */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // DevTools এ উইন্ডো রেজোলিউশন দেখাবে
  useDebugValue(`Window: ${windowSize.width}px x ${windowSize.height}px`);

  return windowSize;
}


/* =========================================
   MAIN COMPONENT 🌿
========================================= */

export default function MultipleDebugExamples() {
  const { isOnline, toggleStatus } = useOnlineStatus();
  const { count, increment, decrement, reset } = useCounter(5);
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Advanced <code className="text-purple-600">useDebugValue</code> Examples
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Open your browser's React DevTools to inspect the custom labels for each of these custom hooks!
          </p>
        </div>

        {/* Grid Examples */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Example 1: Status */}
          <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-green-600 uppercase">Example 01 🍃</span>
              <h2 className="mt-2 text-lg font-bold text-gray-800">Online Status</h2>
              <p className="mt-1 text-xs text-gray-400">Tracks connection state.</p>
              
              <div className={`mt-5 rounded-2xl p-4 text-center ${isOnline ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                <p className="font-bold">{isOnline ? "🟢 Online" : "🔴 Offline"}</p>
              </div>
            </div>

            <button
              onClick={toggleStatus}
              className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-green-700"
            >
              Toggle Status
            </button>
          </div>

          {/* Example 2: Counter */}
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">Example 02 🌊</span>
              <h2 className="mt-2 text-lg font-bold text-gray-800">Smart Counter</h2>
              <p className="mt-1 text-xs text-gray-400">Tracks Even/Odd state.</p>
              
              <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-center text-blue-700">
                <p className="text-2xl font-extrabold">{count}</p>
                <p className="text-xs mt-1 font-semibold">{count % 2 === 0 ? "Even Number" : "Odd Number"}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={decrement} className="flex-1 rounded-xl bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-200">
                -
              </button>
              <button onClick={increment} className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700">
                +
              </button>
              <button onClick={reset} className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200">
                Reset
              </button>
            </div>
          </div>

          {/* Example 3: Window Size */}
          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-lg shadow-orange-100/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase">Example 03 🌸</span>
              <h2 className="mt-2 text-lg font-bold text-gray-800">Window Size</h2>
              <p className="mt-1 text-xs text-gray-400">Tracks responsive dimensions.</p>
              
              <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-center text-orange-700">
                <p className="text-sm font-bold">Width: {width}px</p>
                <p className="text-sm font-bold mt-1">Height: {height}px</p>
              </div>
            </div>

            <p className="mt-6 text-center text-[11px] text-gray-400">
              Resize window to see live updates in DevTools.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}