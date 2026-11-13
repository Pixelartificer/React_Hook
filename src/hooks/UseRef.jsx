import { useState, useRef, useEffect, useId } from "react";

/* =========================================
   EXAMPLE 01: DOM INPUT FOCUS & VALUE 🌲
   (useRef দিয়ে ইনপুট ফিল্ড ফোকাস এবং ভ্যালু রিড করা)
========================================= */

function InputFocusExample() {
  const inputRef = useRef(null);
  const [displayValue, setDisplayValue] = useState("");
  const inputId = useId();

  const handleFocusClick = () => {
    inputRef.current.focus();
  };

  const handleGetText = () => {
    setDisplayValue(inputRef.current.value);
  };

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          DOM Input Focus & Control
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Accessing DOM nodes directly without triggering re-renders using <code className="text-purple-600">useRef</code>.
        </p>
      </div>

      <div className="space-y-3 my-4">
        <label htmlFor={inputId} className="block text-xs font-bold text-gray-700">
          Interactive Input Field
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          placeholder="Type something here..."
          className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-xs focus:border-purple-500 focus:outline-none"
        />
        {displayValue && (
          <p className="rounded-xl bg-purple-50 p-2 text-xs font-semibold text-purple-700">
            Retrieved Value: "{displayValue}"
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleFocusClick}
          className="flex-1 rounded-xl bg-purple-600 px-3 py-2 text-xs font-bold text-white hover:bg-purple-700"
        >
          Focus Input 🎯
        </button>
        <button
          onClick={handleGetText}
          className="flex-1 rounded-xl bg-purple-100 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-200"
        >
          Read Value 📖
        </button>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: TIMER & STOPWATCH 🍃
   (useRef দিয়ে কাউন্টার বা টাইমার আইডি সংরক্ষণ করা)
========================================= */

function StopwatchExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerIdRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerIdRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Stopwatch Timer
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Storing interval IDs inside ref variables safely across renders.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-green-50/50 p-5 text-center">
        <p className="text-xs font-bold text-gray-500">Elapsed Time</p>
        <p className="text-3xl font-extrabold text-green-700 mt-1">{seconds}s</p>
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="flex-1 rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
          >
            Start ⏱️
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="flex-1 rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600"
          >
            Pause ⏸️
          </button>
        )}
        <button
          onClick={resetTimer}
          className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200"
        >
          Reset 🔄
        </button>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: PREVIOUS STATE TRACKER 🌊
   (সংশোধিত: আগের স্টেট ট্র্যাক করার জন্য সঠিক পদ্ধতি)
========================================= */

function PreviousStateTracker() {
  const [name, setName] = useState("");
  const [prevName, setPrevName] = useState(""); // স্টেট ব্যবহার করা হলো যাতে রেন্ডারের সময় এরর না আসে
  const prevNameRef = useRef("");

  useEffect(() => {
    setPrevName(prevNameRef.current); // আগের মান স্টেটে সেভ করা হচ্ছে
    prevNameRef.current = name; // বর্তমান মান রিফে আপডেট করা হচ্ছে
  }, [name]);

  const nameInputId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Previous State Tracker
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Tracking previous render values safely using state and refs combined.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
        <div className="space-y-3">
          <label htmlFor={nameInputId} className="block text-xs font-bold text-gray-700">
            Type Your Name:
          </label>
          <input
            id={nameInputId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Enrique..."
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 flex flex-col justify-center space-y-2 text-xs">
          <p className="text-gray-600">Current Value: <strong className="text-blue-900">{name || "(empty)"}</strong></p>
          <p className="text-gray-600">Previous Value: <strong className="text-blue-700">{prevName || "(none)"}</strong></p>
        </div>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseRef() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useRef</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Reference DOM elements and hold mutable values across renders without causing extra component re-renders.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputFocusExample />
          <StopwatchExample />
          <PreviousStateTracker />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useRef</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}