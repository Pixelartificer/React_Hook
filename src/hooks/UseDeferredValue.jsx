import { useState, useDeferredValue, useMemo } from "react";

/* =========================================
   EXAMPLE 01: LARGE LIST FILTER 🍃
   (বড় লিস্ট ফিল্টার করার জন্য useDeferredValue)
========================================= */

function LargeListFilterExample() {
  const [query, setQuery] = useState("");
  
  // useDeferredValue দিয়ে কুয়েরি ভ্যালুটিকে ডিফার বা স্লো করে দেওয়া হলো
  // যাতে টাইপিংয়ের সময় ইউজার ইন্টারফেস ফ্রিজ না হয়।
  const deferredQuery = useDeferredValue(query);

  // ১০,০০০ আইটেমের একটি বড় ডাটা তৈরি করা হচ্ছে
  const listSize = 10000;
  const items = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= listSize; i++) {
      arr.push(`Item ${i}`);
    }
    return arr;
  }, []);

  // deferredQuery ব্যবহার করে ফিল্টার করা হচ্ছে
  const filteredItems = useMemo(() => {
    if (!deferredQuery) return items.slice(0, 50); // ডিফল্টভাবে প্রথম ৫০টি দেখাবে
    return items.filter((item) =>
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery, items]);

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Large List Search Filter
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Type quickly below. The heavy filtering runs in the background using <code className="text-purple-600">useDeferredValue</code>.
        </p>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search item (e.g. Item 500)..."
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
      />

      {/* Loading Indicator */}
      {query !== deferredQuery && (
        <p className="mt-2 text-xs font-semibold text-purple-500 animate-pulse">
          Filtering results in background... ⏳
        </p>
      )}

      {/* Results List */}
      <div className="mt-4 max-h-48 overflow-y-auto rounded-2xl bg-purple-50/50 p-3 space-y-1">
        {filteredItems.length === 0 ? (
          <p className="text-center text-xs text-gray-400 py-4">No items found.</p>
        ) : (
          filteredItems.slice(0, 100).map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm"
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: LIVE TEXT SCROLLER/RENDERER 🌊
   (হেভি রেন্ডারিং অপ্টিমাইজেশন)
========================================= */

function HeavyList({ text }) {
  // ইচ্ছাকৃতভাবে লুপ চালিয়ে রেন্ডারিং স্লো করা হলো যাতে useDeferredValue-এর কার্যকারিতা বোঝা যায়
  const list = [];
  for (let i = 0; i < 4000; i++) {
    list.push(
      <div key={i} className="text-[10px] text-gray-500">
        Result for: {text} #{i}
      </div>
    );
  }

  return <div className="mt-3 max-h-40 overflow-y-auto rounded-xl bg-gray-50 p-3 space-y-1">{list}</div>;
}

function HeavyRenderExample() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 02 🌸
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Heavy Component Rendering
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          The input updates instantly, while the heavy component below uses the deferred value.
        </p>
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something heavy..."
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
      />

      {/* Heavy list rendered using deferredText */}
      <HeavyList text={deferredText} />
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌿
========================================= */

export default function UseDeferredValue() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hook Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useDeferredValue</code>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Explore how React keeps user interfaces smooth during heavy computations and large data filtering.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <LargeListFilterExample />
          <HeavyRenderExample />
        </div>

      </div>
    </div>
  );
}