import { useState, useInsertionEffect, useId } from "react";

/* =========================================
   EXAMPLE 01: DYNAMIC CSS RULE INJECTOR 🌲
   (useInsertionEffect দিয়ে রানটাইমে CSS রুল ইনজেক্ট করা)
========================================= */

function DynamicStyleExample() {
  const [bgClass, setBgClass] = useState("bg-purple-600");

  // DOM এ স্টাইল ট্যাগ ইনজেক্ট করার জন্য useInsertionEffect ব্যবহার করা হচ্ছে
  useInsertionEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .custom-dynamic-box {
        transition: all 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Dynamic CSS Inserter
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Injecting styles before layout calculations using <code className="text-purple-600">useInsertionEffect</code>.
        </p>
      </div>

      <div className={`custom-dynamic-box mt-5 rounded-2xl p-5 text-center text-white ${bgClass}`}>
        <p className="text-sm font-bold">Styled via Injected CSS Rules 🍃</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setBgClass("bg-purple-600")}
          className="flex-1 rounded-xl bg-purple-100 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-200"
        >
          Purple
        </button>
        <button
          onClick={() => setBgClass("bg-green-600")}
          className="flex-1 rounded-xl bg-green-100 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-200"
        >
          Green
        </button>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: DYNAMIC THEME STYLE INJECTOR 🍃
   (থিম স্টাইলশিট ইনজেক্ট করার উদাহরণ)
========================================= */

function ThemeStyleExample() {
  const [themeColor, setThemeColor] = useState("#10b981");

  useInsertionEffect(() => {
    const styleId = "dynamic-theme-style";
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      .theme-highlight-border {
        border-color: ${themeColor} !important;
      }
    `;
  }, [themeColor]);

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Theme Style Injector
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Updating style tags instantly to prevent layout flicker.
        </p>
      </div>

      <div className="theme-highlight-border mt-5 rounded-2xl border-2 bg-green-50/50 p-5 text-center">
        <p className="text-sm font-bold text-gray-700">Current Theme Color: {themeColor}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setThemeColor("#10b981")}
          className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
        >
          Emerald
        </button>
        <button
          onClick={() => setThemeColor("#3b82f6")}
          className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
        >
          Blue
        </button>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: GLOBAL FONT SCALE CONTROLLER 🌊
   (ফন্ট সাইজ স্টাইল ইনজেকশন)
========================================= */

function FontScaleExample() {
  const [fontSize, setFontSize] = useState("16px");

  useInsertionEffect(() => {
    const styleId = "global-font-scale";
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      .dynamic-scale-text {
        font-size: ${fontSize};
      }
    `;
  }, [fontSize]);

  const selectId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Font Scale Injector
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Injecting typography rules dynamically for layout stability.
        </p>
      </div>

      <div className="my-5 rounded-2xl bg-blue-50/50 p-5 text-center">
        <p className="dynamic-scale-text font-bold text-blue-800">
          Nature and Technology in Harmony 🌲🌿🌊
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor={selectId} className="text-xs font-bold text-gray-700">
          Select Font Size:
        </label>
        <select
          id={selectId}
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="14px">Small (14px)</option>
          <option value="16px">Normal (16px)</option>
          <option value="20px">Large (20px)</option>
          <option value="24px">Extra Large (24px)</option>
        </select>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseInsertionEffect() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useInsertionEffect</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Designed for CSS-in-JS library authors to inject styles before any DOM mutations or layout calculations occur.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DynamicStyleExample />
          <ThemeStyleExample />
          <FontScaleExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useInsertionEffect</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}