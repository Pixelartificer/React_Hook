import React, { useState, useMemo, useId } from "react";

/* =========================================
   EXAMPLE 01: EXPENSIVE CALCULATION 🌲
   (useMemo দিয়ে ভারী গাণিতিক হিসাব ক্যাশ করা)
========================================= */

function ExpensiveCalculationExample() {
  const [number, setNumber] = useState(5);
  const [darkTheme, setDarkTheme] = useState(false);

  const factorial = useMemo(() => {
    console.log("Running expensive calculation...");
    let result = 1;
    for (let i = 1; i <= number; i++) {
      result *= i;
    }
    return result;
  }, [number]);

  const inputId = useId();

  return (
    <div className={`rounded-3xl border p-6 shadow-lg transition ${
      darkTheme ? "border-gray-700 bg-gray-800 text-white" : "border-purple-100 bg-white text-gray-800"
    }`}>
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold">
          Expensive Calculation Memoization
        </h2>
        <p className={`mt-1 text-xs ${darkTheme ? "text-gray-300" : "text-gray-400"}`}>
          Caching computation results using <code className="text-purple-500">useMemo</code>.
        </p>
      </div>

      <div className="space-y-4 my-4">
        <div>
          <label htmlFor={inputId} className="block text-xs font-bold mb-1">
            Calculate Factorial for: {number}
          </label>
          <input
            id={inputId}
            type="number"
            min="1"
            max="15"
            value={number}
            onChange={(e) => setNumber(Math.max(1, parseInt(e.target.value) || 1))}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none ${
              darkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-white text-gray-800"
            }`}
          />
        </div>

        <div className={`rounded-2xl p-4 text-center ${darkTheme ? "bg-gray-700" : "bg-purple-50"}`}>
          <p className="text-xs font-semibold">Result Value:</p>
          <p className="text-2xl font-extrabold text-purple-600 mt-1">{factorial}</p>
        </div>
      </div>

      <button
        onClick={() => setDarkTheme((prev) => !prev)}
        className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700"
      >
        Toggle Card Theme ({darkTheme ? "Dark" : "Light"})
      </button>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: FILTERABLE DATA LIST 🍃
   (বড় লিস্ট থেকে ফিল্টার করার জন্য useMemo)
========================================= */

function FilterableListExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const items = [
    { id: 1, name: "Pine Tree Sapling", category: "plants" },
    { id: 2, name: "Bamboo Stalks", category: "plants" },
    { id: 3, name: "Wildflower Seeds", category: "plants" },
    { id: 4, name: "Mountain River Water", category: "nature" },
    { id: 5, name: "Fresh Forest Air", category: "nature" },
    { id: 6, name: "Organic Honey", category: "food" },
    { id: 7, name: "Herbal Tea Leaves", category: "food" },
  ];

  const filteredItems = useMemo(() => {
    console.log("Filtering items list...");
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category]);

  const searchId = useId();
  const selectId = useId();

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Filterable Data List
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Filtering large arrays efficiently with dependencies.
        </p>
      </div>

      <div className="space-y-3 my-4">
        <div>
          <label htmlFor={searchId} className="block text-xs font-bold text-gray-700 mb-1">
            Search Nature Items
          </label>
          <input
            id={searchId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor={selectId} className="block text-xs font-bold text-gray-700 mb-1">
            Category Filter
          </label>
          <select
            id={selectId}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-bold text-gray-700 focus:border-green-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="plants">Plants 🌲</option>
            <option value="nature">Nature 🌊</option>
            <option value="food">Food 🍃</option>
          </select>
        </div>

        <div className="max-h-32 overflow-y-auto rounded-2xl bg-green-50/50 p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-2">No items found.</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm flex justify-between">
                <span>{item.name}</span>
                <span className="text-green-600 uppercase text-[10px]">{item.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: SHOPPING CART TOTALS 🌊
   (সংশোধিত শপিং কার্ট এবং টোটাল ক্যালকুলেশন)
========================================= */

function CartTotalsExample() {
  const [discountCode, setDiscountCode] = useState("");
  
  // ✅ এখানে সঠিক সিনট্যাক্সে অ্যারে অবজেক্ট ডিক্লেয়ার করা হয়েছে
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Eco Water Bottle", price: 1200, qty: 2 },
    { id: 2, name: "Organic Cotton T-Shirt", price: 1800, qty: 1 },
    { id: 3, name: "Solar Power Bank", price: 3500, qty: 1 },
  ]);

  const { subtotal, discount, finalTotal } = useMemo(() => {
    console.log("Calculating cart totals...");
    const sub = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    let disc = 0;
    if (discountCode.trim().toUpperCase() === "NATURE20") {
      disc = sub * 0.20; // ২০% ডিসকাউন্ট
    }
    return {
      subtotal: sub,
      discount: disc,
      finalTotal: sub - disc,
    };
  }, [cartItems, discountCode]);

  const promoId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Cart Totals Memoization
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Caching derived state calculations to optimize e-commerce renders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
        {/* Cart Item List */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-700">Cart Items</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center rounded-xl bg-blue-50/50 p-3 text-xs font-semibold text-gray-700">
              <span>{item.name} (x{item.qty})</span>
              <span className="text-blue-700">BDT {item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* Calculation Summary */}
        <div className="rounded-2xl bg-blue-50 p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-bold">BDT {subtotal}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (Use 'NATURE20'):</span>
              <span className="font-bold">- BDT {Math.round(discount)}</span>
            </div>
            <div className="border-t border-blue-200 pt-2 flex justify-between text-sm font-extrabold text-blue-900">
              <span>Final Total:</span>
              <span>BDT {Math.round(finalTotal)}</span>
            </div>
          </div>

          <div>
            <label htmlFor={promoId} className="block text-[11px] font-bold text-gray-600 mb-1">
              Promo Code
            </label>
            <input
              id={promoId}
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter NATURE20"
              className="w-full rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-bold uppercase focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseMemo() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useMemo</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Optimize performance by memoizing expensive calculations between re-renders using dependencies.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ExpensiveCalculationExample />
          <FilterableListExample />
          <CartTotalsExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useMemo</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}