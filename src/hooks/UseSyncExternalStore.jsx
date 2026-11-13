import { useSyncExternalStore, useState, useId } from "react";

/* =========================================
   EXAMPLE 01: WINDOW SIZE TRACKER 🌲
   (useSyncExternalStore দিয়ে উইন্ডোজের স্ক্রিন সাইজ ট্র্যাক করা)
========================================= */

function subscribeToWindowSize(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getWindowSizeSnapshot() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function WindowSizeExample() {
  const windowSize = useSyncExternalStore(
    subscribeToWindowSize,
    getWindowSizeSnapshot,
    () => ({ width: 1024, height: 768 }) // Server-side fallback snapshot
  );

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Window Dimension Tracker
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Syncing external window resize events safely using <code className="text-purple-600">useSyncExternalStore</code>.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-purple-50/50 p-5 text-center space-y-1">
        <p className="text-xs font-bold text-gray-500">Current Viewport Size</p>
        <p className="text-2xl font-extrabold text-purple-700">
          {windowSize.width}px <span className="text-sm font-normal text-gray-400">×</span> {windowSize.height}px
        </p>
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Resize your browser window to see live updates.
      </p>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: ONLINE / OFFLINE STATUS 🍃
   (নেটওয়ার্ক কানেক্টিভিটি ট্র্যাক করার উদাহরণ)
========================================= */

function subscribeToNetworkStatus(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getNetworkSnapshot() {
  return navigator.onLine;
}

function NetworkStatusExample() {
  const isOnline = useSyncExternalStore(
    subscribeToNetworkStatus,
    getNetworkSnapshot,
    () => true
  );

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Network Status Detector
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Subscribing to browser navigator online/offline status changes.
        </p>
      </div>

      <div className={`my-5 rounded-2xl p-5 text-center transition ${
        isOnline ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
      }`}>
        <p className="text-xs font-bold text-gray-500">Connection Status</p>
        <p className="text-xl font-extrabold mt-1">
          {isOnline ? "🟢 Online & Connected" : "🔴 Offline Mode"}
        </p>
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Try toggling your internet connection to test responsiveness.
      </p>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: LOCAL STORAGE SYNCHRONIZER 🌊
   (লোকাল স্টোরেজ ডেটা সিঙ্ক ও ম্যানেজ করার উদাহরণ)
========================================= */

function subscribeToLocalStorage(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getLocalStorageSnapshot() {
  return localStorage.getItem("nature_note") || "No saved note found... 🌲";
}

function LocalStorageSyncExample() {
  const [inputValue, setInputValue] = useState("");
  const noteContent = useSyncExternalStore(
    subscribeToLocalStorage,
    getLocalStorageSnapshot,
    () => "Loading note..."
  );

  const handleSaveNote = (e) => {
    e.preventDefault();
    localStorage.setItem("nature_note", inputValue);
    // Trigger storage event manually for same-tab sync demonstration
    window.dispatchEvent(new Event("storage"));
  };

  const inputId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          External Storage Synchronizer
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Reading and syncing browser local storage data reactively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
        <div className="rounded-2xl bg-blue-50/50 p-4 flex flex-col justify-center space-y-2">
          <p className="text-xs font-bold text-gray-500">Synced Storage Value:</p>
          <p className="text-sm font-extrabold text-blue-900 bg-white p-3 rounded-xl border border-blue-100">
            "{noteContent}"
          </p>
        </div>

        <form onSubmit={handleSaveNote} className="space-y-3 flex flex-col justify-center">
          <div>
            <label htmlFor={inputId} className="block text-xs font-bold text-gray-700 mb-1">
              Update Nature Note
            </label>
            <input
              id={inputId}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type new note..."
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            Save to LocalStorage 💾
          </button>
        </form>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseSyncExternalStoreExamples() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useSyncExternalStore</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Safely read and subscribe to external data sources with concurrent rendering support.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <WindowSizeExample />
          <NetworkStatusExample />
          <LocalStorageSyncExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useSyncExternalStore</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}