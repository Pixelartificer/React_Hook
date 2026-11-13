import { useState, useLayoutEffect, useRef, useId } from "react";

/* =========================================
   EXAMPLE 01: DOM ELEMENT MEASUREMENT 🌲
   (useLayoutEffect দিয়ে DOM এলিমেন্টের সঠিক উইডথ/হাইট মাপা)
========================================= */

function BoxMeasurementExample() {
  const boxRef = useRef(null);
  const [boxDimensions, setBoxDimensions] = useState({ width: 0, height: 0 });
  const [toggleSize, setToggleSize] = useState(false);

  // useLayoutEffect ব্যবহার করার ফলে ব্রাউজার পেইন্ট করার আগেই সাইজ মেপে আপডেট হয়ে যায়
  useLayoutEffect(() => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      setBoxDimensions({ width: Math.round(width), height: Math.round(height) });
    }
  }, [toggleSize]);

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          DOM Element Measurement
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Measuring box dimensions synchronously before paint using <code className="text-purple-600">useLayoutEffect</code>.
        </p>
      </div>

      <div
        ref={boxRef}
        className={`my-5 rounded-2xl bg-purple-50 p-5 text-center transition-all duration-300 ${
          toggleSize ? "w-full py-10" : "w-3/4 py-4"
        } mx-auto border border-purple-200`}
      >
        <p className="text-xs font-bold text-purple-700">
          Width: {boxDimensions.width}px | Height: {boxDimensions.height}px
        </p>
      </div>

      <button
        onClick={() => setToggleSize((prev) => !prev)}
        className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700"
      >
        Toggle Box Size
      </button>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: SCROLL POSITION RESTORER 🍃
   (বক্সের স্ক্রল পজিশন সিনক্রোনাসলি ট্র্যাক বা রিসেট করা)
========================================= */

function ScrollRestorerExample() {
  const scrollRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollTop(Math.round(scrollRef.current.scrollTop));
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Scroll Position Tracker
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Tracking smooth container scrolling synchronously.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="my-4 h-32 overflow-y-auto rounded-2xl bg-green-50/50 p-4 border border-green-100 space-y-2"
      >
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="rounded-lg bg-white p-2 text-xs font-semibold text-gray-700 shadow-sm">
            Scroll Item #{i + 1} 🌿
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-green-700">
          Scroll Position: {scrollTop}px
        </span>
        <button
          onClick={scrollToTop}
          className="rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-700"
        >
          Scroll to Top
        </button>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: TOOLTIP POSITION CALCULATOR 🌊
   (টুলটিপ বা পপআপ পজিশন সেট করা)
========================================= */

function TooltipPositionExample() {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: buttonRect.bottom + 8,
        left: buttonRect.left,
      });
    }
  }, [showTooltip]);

  const btnId = useId();

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Synchronous Tooltip Positioning
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Calculating coordinates before browser paint to avoid layout flickering.
        </p>
      </div>

      <div className="my-8 text-center relative">
        <button
          ref={buttonRef}
          id={btnId}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
        >
          Hover over me for Tooltip 🎯
        </button>

        {showTooltip && (
          <div
            ref={tooltipRef}
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
            className="fixed z-50 rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-bold text-white shadow-xl animate-fade-in"
          >
            ✨ I am positioned precisely using useLayoutEffect!
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400">
        The tooltip coordinates are computed right after DOM layout and before visual rendering.
      </p>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseLayoutEffect() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useLayoutEffect</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fires synchronously after all DOM mutations, allowing you to read layout and re-render before paint.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <BoxMeasurementExample />
          <ScrollRestorerExample />
          <TooltipPositionExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useLayoutEffect</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}