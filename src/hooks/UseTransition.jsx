import { useState, useTransition, useId } from "react";

/* =========================================
   EXAMPLE 01: TAB SWITCHER WIZARD 🌲
   (useTransition দিয়ে ট্যাব পরিবর্তন স্মুথ রাখা)
========================================= */

function TabSwitcherExample() {
  const [activeTab, setActiveTab] = useState("forest");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tabName) => {
    startTransition(() => {
      setActiveTab(tabName);
    });
  };

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Non-Blocking Tab Switcher
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Switching views smoothly without blocking UI using <code className="text-purple-600">useTransition</code>.
        </p>
      </div>

      <div className="my-5 flex gap-2">
        <button
          onClick={() => handleTabChange("forest")}
          className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
            activeTab === "forest" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          Forest 🌲
        </button>
        <button
          onClick={() => handleTabChange("river")}
          className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
            activeTab === "river" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          River 🌊
        </button>
        <button
          onClick={() => handleTabChange("mountain")}
          className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition ${
            activeTab === "mountain" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
          }`}
        >
          Mountain ⛰️
        </button>
      </div>

      <div className="rounded-2xl bg-purple-50/50 p-4 text-center min-h-[80px] flex flex-col justify-center items-center">
        {isPending && <p className="text-[11px] text-purple-500 animate-pulse mb-1">Loading content... ⏳</p>}
        <p className="text-sm font-extrabold text-purple-900">
          {activeTab === "forest" && "🌲 Exploring the deep green pine and oak forest canopy."}
          {activeTab === "river" && "🌊 Listening to the soothing flow of the crystal clear river."}
          {activeTab === "mountain" && "⛰️ Standing high and firm amidst the snowy peak mountains."}
        </p>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: HEAVY LIST FILTER 🍃
   (বড় লিস্ট ফিল্টার করার সময় ইনপুট ফ্রিজ হওয়া রোধ করা)
========================================= */

function HeavyListFilterExample() {
  const [inputQuery, setInputQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // অনেকগুলো আইটেমের ডামি লিস্ট তৈরি করা হলো
  const dummyList = Array.from({ length: 10000 }, (_, i) => `Nature Item #${i + 1}`);

  const filteredItems = dummyList.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputQuery(value); // ইনপুট ইনস্ট্যান্ট আপডেট হবে

    startTransition(() => {
      setSearchQuery(value); // ভারী ফিল্টারিং ব্যাকগ্রাউন্ডে চলবে
    });
  };

  const inputId = useId();

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Heavy List Filtering
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Keeping typing responsive while processing massive arrays.
        </p>
      </div>

      <div className="space-y-3 my-4">
        <div>
          <label htmlFor={inputId} className="block text-xs font-bold text-gray-700 mb-1">
            Search 10,000+ Items {isPending && <span className="text-green-600 text-[10px] animate-pulse">Filtering... ⏳</span>}
          </label>
          <input
            id={inputId}
            type="text"
            value={inputQuery}
            onChange={handleInputChange}
            placeholder="Type to filter..."
            className="w-full rounded-xl border border-green-200 px-4 py-2.5 text-xs focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="max-h-28 overflow-y-auto rounded-xl bg-green-50/50 p-3 space-y-1 text-xs text-gray-700">
          {filteredItems.slice(0, 10).map((item, index) => (
            <div key={index} className="bg-white px-3 py-1.5 rounded-lg shadow-sm font-semibold">
              {item} 🍃
            </div>
          ))}
          {filteredItems.length > 10 && (
            <p className="text-center text-[10px] text-gray-400 py-1">And {filteredItems.length - 10} more items...</p>
          )}
        </div>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: LIVE STATS COUNTER 🌊
   (লো প্রায়োরিটি রেন্ডার আপডেট টেস্টিং)
========================================= */

function LiveStatsExample() {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleIncrement = () => {
    setCount((prev) => prev + 1); // ইনস্ট্যান্ট স্টেট

    startTransition(() => {
      setDisplayCount((prev) => prev + 1); // ট্রানজিশন স্টেট
    });
  };

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Prioritized State Updates
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Marking non-critical UI updates as transitions to preserve user interaction speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
        <div className="rounded-2xl bg-blue-50 p-5 text-center flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500">Immediate Action Count</p>
          <p className="text-3xl font-extrabold text-blue-900 mt-1">{count}</p>
        </div>

        <div className="rounded-2xl bg-blue-50/50 p-5 text-center flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500">
            Transition Render Count {isPending && <span className="text-blue-600 text-[10px] animate-pulse">Syncing...</span>}
          </p>
          <p className="text-3xl font-extrabold text-blue-700 mt-1">{displayCount}</p>
        </div>
      </div>

      <button
        onClick={handleIncrement}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
      >
        Click to Increment Progress 🚀
      </button>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseTransition() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useTransition</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Keep user interfaces responsive by allowing state updates to be performed without blocking rendering.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TabSwitcherExample />
          <HeavyListFilterExample />
          <LiveStatsExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useTransition</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}