import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

/* =========================================
   EXAMPLE 01: CUSTOM INPUT CONTROLLER 🌲
   (প্যারেন্ট থেকে ইনপুট কন্ট্রোল করার চাইল্ড কম্পোনেন্ট)
========================================= */

const CustomInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current.focus();
    },
    clearInput: () => {
      setValue("");
      inputRef.current.focus();
    },
    getValue: () => value,
  }));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-700">
        Input Box 🍃
      </label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type text here..."
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none"
      />
    </div>
  );
});


/* =========================================
   EXAMPLE 02: CUSTOM MODAL CONTROLLER 🌊
   (প্যারেন্ট থেকে মডাল ওপেন/ক্লোজ কন্ট্রোল করার চাইল্ড কম্পোনেন্ট)
========================================= */

const CustomModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    getStatus: () => (isOpen ? "Modal is Open" : "Modal is Closed"),
  }));

  if (!isOpen) return null;

  return (
    <div className="rounded-2xl bg-blue-50 p-4 border border-blue-200 mt-3">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-blue-800">✨ Imperative Modal Box</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs font-bold text-red-500 hover:text-red-700"
        >
          ✕ Close
        </button>
      </div>
      <p className="mt-1 text-xs text-blue-600">
        This modal was opened securely via parent ref methods!
      </p>
    </div>
  );
});


/* =========================================
   EXAMPLE 03: PROGRESS BAR CONTROLLER 🌸
   (প্যারেন্ট থেকে প্রোগ্রেস বার কন্ট্রোল করার চাইল্ড কম্পোনেন্ট)
========================================= */

const ProgressBar = forwardRef((props, ref) => {
  const [progress, setProgress] = useState(25);

  useImperativeHandle(ref, () => ({
    increase: () => setProgress((prev) => Math.min(100, prev + 20)),
    decrease: () => setProgress((prev) => Math.max(0, prev - 20)),
    reset: () => setProgress(0),
  }));

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-gray-700">
        <span>Progress Status</span>
        <span className="text-orange-600">{progress}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
});


/* =========================================
   MAIN APPLICATION CONTAINER 🌿
========================================= */

export default function UseImperativeHandle() {
  // Refs for each child component
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const progressRef = useRef(null);

  const [inputVal, setInputVal] = useState("");
  const [modalStatus, setModalStatus] = useState("");

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Advanced <code className="text-purple-600">useImperativeHandle</code> Examples
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Control child component instances imperatively using refs across multiple use cases.
          </p>
        </div>

        {/* Grid Container for Multiple Examples */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Card 1: Input Control */}
          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase">Example 01 🍃</span>
              <h2 className="mt-2 text-lg font-bold text-gray-800">Input Control Panel</h2>
              <p className="mt-1 text-xs text-gray-400">Focus, clear, and fetch value imperatively.</p>
              
              <div className="mt-4 rounded-2xl bg-purple-50/50 p-4">
                <CustomInput ref={inputRef} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => inputRef.current?.focusInput()}
                className="flex-1 rounded-xl bg-purple-600 px-3 py-2 text-xs font-bold text-white hover:bg-purple-700"
              >
                Focus
              </button>
              <button
                onClick={() => inputRef.current?.clearInput()}
                className="flex-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-bold text-white hover:bg-red-600"
              >
                Clear
              </button>
              <button
                onClick={() => setInputVal(inputRef.current?.getValue() || "")}
                className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"
              >
                Get Val
              </button>
            </div>

            {inputVal && (
              <p className="mt-3 text-xs font-semibold text-purple-700">
                Retrieved: "{inputVal}"
              </p>
            )}
          </div>

          {/* Card 2: Modal Dialog Control */}
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">Example 02 🌊</span>
              <h2 className="mt-2 text-lg font-bold text-gray-800">Modal Dialog Control</h2>
              <p className="mt-1 text-xs text-gray-400">Trigger popup states from parent actions.</p>
              
              <CustomModal ref={modalRef} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => modalRef.current?.openModal()}
                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                Open Modal
              </button>
              <button
                onClick={() => modalRef.current?.closeModal()}
                className="flex-1 rounded-xl bg-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-300"
              >
                Close Modal
              </button>
              <button
                onClick={() => setModalStatus(modalRef.current?.getStatus() || "")}
                className="rounded-xl bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-200"
              >
                Status
              </button>
            </div>

            {modalStatus && (
              <p className="mt-3 text-xs font-semibold text-blue-700">
                {modalStatus}
              </p>
            )}
          </div>

          {/* Card 3: Progress Bar Control (Full Width on Desktop) */}
          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-lg shadow-orange-100/30 md:col-span-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase">Example 03 🌸</span>
              <h2 className="mt-2 text-lg font-bold text-gray-800">Progress Bar Controller</h2>
              <p className="mt-1 text-xs text-gray-400">Manipulate progress level imperatively using ref methods.</p>
              
              <div className="mt-5 rounded-2xl bg-orange-50/50 p-5">
                <ProgressBar ref={progressRef} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => progressRef.current?.decrease()}
                className="flex-1 rounded-xl bg-orange-100 px-4 py-2.5 text-xs font-bold text-orange-700 hover:bg-orange-200"
              >
                Decrease (-20%)
              </button>
              <button
                onClick={() => progressRef.current?.increase()}
                className="flex-1 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-orange-700"
              >
                Increase (+20%)
              </button>
              <button
                onClick={() => progressRef.current?.reset()}
                className="rounded-xl bg-gray-100 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-200"
              >
                Reset (0%)
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useImperativeHandle</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}