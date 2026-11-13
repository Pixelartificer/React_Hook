import React, { useReducer, useState, useId } from "react";

/* =========================================
   EXAMPLE 01: ADVANCED COUNTER 🌲
   (useReducer দিয়ে কাস্টম স্টেপ কাউন্টার)
========================================= */

const counterInitialState = { count: 0, step: 1 };

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return counterInitialState;
    default:
      return state;
  }
}

function AdvancedCounterExample() {
  const [state, dispatch] = useReducer(counterReducer, counterInitialState);
  const stepInputId = useId();

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Advanced Counter Reducer
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Managing numeric actions & steps using <code className="text-purple-600">useReducer</code>.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-purple-50/50 p-5 text-center">
        <p className="text-xs font-bold text-gray-500">Current Count</p>
        <p className="text-3xl font-extrabold text-purple-700 mt-1">{state.count}</p>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: "DECREMENT" })}
            className="flex-1 rounded-xl bg-purple-100 px-4 py-2.5 text-xs font-bold text-purple-700 hover:bg-purple-200"
          >
            Decrease (-{state.step})
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="flex-1 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700"
          >
            Increase (+{state.step})
          </button>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <label htmlFor={stepInputId} className="text-xs font-bold text-gray-700">
            Step Size:
          </label>
          <input
            id={stepInputId}
            type="number"
            min="1"
            max="10"
            value={state.step}
            onChange={(e) => dispatch({ type: "SET_STEP", payload: parseInt(e.target.value) || 1 })}
            className="w-16 rounded-xl border border-purple-200 px-3 py-1.5 text-xs font-bold text-center focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="ml-auto rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: SHOPPING CART REDUCER 🍃
   (কার্ট আইটেম কোয়ান্টিটি ও রিমুভ ম্যানেজমেন্ট)
========================================= */

const initialCartState = {
  items: [
    { id: 1, name: "Eco Water Bottle", price: 1200, qty: 1 },
    { id: 2, name: "Organic Cotton T-Shirt", price: 1800, qty: 2 },
  ],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INCREMENT_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, qty: Math.max(1, item.qty - 1) } : item
          ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

function CartReducerExample() {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const totalAmount = cartState.items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Cart Reducer Manager
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Handling complex list mutations with explicit actions.
        </p>
      </div>

      <div className="my-4 max-h-40 overflow-y-auto space-y-2 pr-1">
        {cartState.items.length === 0 ? (
          <p className="text-center text-xs text-gray-400 py-4">Your cart is empty.</p>
        ) : (
          cartState.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center rounded-xl bg-green-50/50 p-3 text-xs font-semibold">
              <div>
                <p className="text-gray-800 font-bold">{item.name}</p>
                <p className="text-green-600">BDT {item.price * item.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => cartDispatch({ type: "DECREMENT_QTY", payload: item.id })}
                  className="h-6 w-6 rounded bg-white font-bold text-gray-600 shadow-sm"
                >
                  -
                </button>
                <span className="w-4 text-center">{item.qty}</span>
                <button
                  onClick={() => cartDispatch({ type: "INCREMENT_QTY", payload: item.id })}
                  className="h-6 w-6 rounded bg-white font-bold text-gray-600 shadow-sm"
                >
                  +
                </button>
                <button
                  onClick={() => cartDispatch({ type: "REMOVE_ITEM", payload: item.id })}
                  className="ml-2 text-red-500 font-bold hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-xl bg-green-600 p-3 text-white flex justify-between items-center">
        <span className="text-xs font-bold">Total Payment:</span>
        <span className="text-sm font-extrabold">BDT {totalAmount}</span>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: MULTI-STEP FORM WIZARD 🌊
   (মাল্টি-স্টেপ ফর্ম নেভিগেশন useReducer দিয়ে)
========================================= */

const formInitialState = {
  step: 1,
  name: "",
  email: "",
  bio: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: Math.min(3, state.step + 1) };
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

function FormWizardExample() {
  const [formState, formDispatch] = useReducer(formReducer, formInitialState);
  const nameId = useId();
  const emailId = useId();
  const bioId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Multi-Step Form Wizard
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Controlling step transitions and inputs state cleanly.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-blue-50/50 p-6">
        {/* Step Indicators */}
        <div className="flex justify-center mb-6 space-x-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${formState.step === 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}>Step 1</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${formState.step === 2 ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}>Step 2</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${formState.step === 3 ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}>Step 3</span>
        </div>

        {/* Step 1 */}
        {formState.step === 1 && (
          <div className="space-y-3">
            <label htmlFor={nameId} className="block text-xs font-bold text-gray-700">Your Full Name</label>
            <input
              id={nameId}
              type="text"
              value={formState.name}
              onChange={(e) => formDispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })}
              placeholder="e.g., John Smith"
              className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Step 2 */}
        {formState.step === 2 && (
          <div className="space-y-3">
            <label htmlFor={emailId} className="block text-xs font-bold text-gray-700">Email Address</label>
            <input
              id={emailId}
              type="email"
              value={formState.email}
              onChange={(e) => formDispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })}
              placeholder="e.g., john@example.com"
              className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Step 3 */}
        {formState.step === 3 && (
          <div className="space-y-3">
            <label htmlFor={bioId} className="block text-xs font-bold text-gray-700">Short Bio / Nature Interest</label>
            <textarea
              id={bioId}
              rows="3"
              value={formState.bio}
              onChange={(e) => formDispatch({ type: "UPDATE_FIELD", field: "bio", value: e.target.value })}
              placeholder="Write a few words..."
              className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => formDispatch({ type: "PREV_STEP" })}
          disabled={formState.step === 1}
          className="rounded-xl bg-gray-100 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={() => formDispatch({ type: "NEXT_STEP" })}
          disabled={formState.step === 3}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-40"
        >
          Next Step 🌊
        </button>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseReducerExample() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useReducer</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            An alternative to useState for managing complex state transitions using explicit action dispatchers.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AdvancedCounterExample />
          <CartReducerExample />
          <FormWizardExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useReducer</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}