


const hookNames = [
  "useActionState",
  "useCallback",
  "useContext",
  "useDebugValue",
  "useDeferredValue",
  "useEffect",
  "useEffectEvent",
  "useId",
  "useImperativeHandle",
  "useInsertionEffect",
  "useLayoutEffect",
  "useMemo",
  "useOptimistic",
  "useReducer",
  "useRef",
  "useState",
  "useSyncExternalStore",
  "useTransition",
  "Custom Hook",
];

const Hooks = () => {
  return (

    <div className="relative min-h-screen overflow-hidden bg-[#faf9ff] text-[#302747]">

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(139,92,246,.08);
          }
          50% {
            box-shadow: 0 0 30px rgba(139,92,246,.2);
          }
        }

        .float-animation {
          animation: float 8s ease-in-out infinite;
        }

        .gradient-animation {
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }

        .fade-animation {
          animation: fadeUp .8s ease both;
        }

        .hook-card {
          animation: fadeUp .7s ease both;
          animation-delay: calc(var(--i) * 50ms);
        }

        .hook-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 35px rgba(119, 82, 190, .18);
        }

        .hook-card:hover .hook-arrow {
          transform: translateX(5px);
        }

        .hook-card:hover .hook-number {
          transform: scale(1.1) rotate(-8deg);
        }

        .hook-number,
        .hook-arrow {
          transition: all .3s ease;
        }

        .hook-card:hover .hook-title {
          color: white;
        }

        .hook-card:hover .hook-number {
          background: rgba(255,255,255,.2);
          color: white;
        }

        .hook-card:hover .hook-arrow {
          color: white;
        }

        .hook-card:hover .hover-bg {
          opacity: 1;
        }

        .glass {
          background: rgba(255,255,255,.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="float-animation absolute -left-40 top-32 h-96 w-96 rounded-full bg-purple-300/30 blur-[110px]" />

        <div className="float-animation absolute -right-40 top-60 h-[450px] w-[450px] rounded-full bg-violet-300/30 blur-[120px]" />

        <div className="float-animation absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-pink-200/30 blur-[110px]" />

      </div>

      {/* NAVBAR */}
      <nav className="glass sticky top-0 z-50 border-b border-purple-100/80">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <a href="#" className="group flex items-center gap-3">

            <div className="gradient-animation flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 via-violet-500 to-fuchsia-500 text-2xl font-black text-white shadow-lg shadow-purple-300/40 transition group-hover:rotate-12">
              H
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                React<span className="text-purple-600">Hooks</span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[.25em] text-gray-400">
                Developer Collection
              </p>
            </div>

          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold text-gray-500 md:flex">

            <a href="#home" className="transition hover:text-purple-600">
              Home
            </a>

            <a href="#hooks" className="transition hover:text-purple-600">
              Hooks Library
            </a>

            <a href="#footer" className="transition hover:text-purple-600">
              About
            </a>

          </div>

          <a
            href="#hooks"
            className="rounded-xl bg-purple-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-purple-700 sm:px-6 sm:text-sm"
          >
            Explore Now ↗
          </a>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative px-4 pb-20 pt-20 text-center sm:px-6 md:pb-28 md:pt-28"
      >

        <div className="fade-animation relative mx-auto max-w-5xl">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-xl sm:px-5">

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-600" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 sm:text-xs">
              Welcome to React Hooks Universe
            </span>

          </div>

          <h2 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">

            Explore the

            <span className="gradient-animation mt-2 block bg-gradient-to-r from-purple-700 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              React Universe.
            </span>

          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base md:text-lg md:leading-8">
            Everything you need in one beautiful collection.
            Discover the complete React Hooks library and explore
            your favorite Hooks.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">

            <a
              href="#hooks"
              className="group rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-purple-300/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-2xl sm:px-9 sm:py-4 sm:text-base"
            >
              Explore All Hooks
              <span className="ml-2 inline-block transition group-hover:translate-x-2">
                →
              </span>
            </a>

            <a
              href="#hooks"
              className="rounded-xl border border-purple-200 bg-white/80 px-6 py-3.5 text-sm font-bold text-purple-700 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-50 sm:rounded-2xl sm:px-9 sm:py-4 sm:text-base"
            >
              Discover More
            </a>

          </div>

          {/* STATISTICS */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-purple-100 rounded-2xl border border-white bg-white/70 p-4 shadow-xl shadow-purple-100/50 backdrop-blur-xl sm:mt-16 sm:rounded-3xl sm:p-6">

            <div>
              <h3 className="text-2xl font-black text-purple-700 sm:text-4xl">
                19
              </h3>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
                Hooks
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-purple-700 sm:text-4xl">
                08
              </h3>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
                Collections
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-purple-700 sm:text-4xl">
                ∞
              </h3>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
                Possibilities
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOOKS LIBRARY */}
      <section
        id="hooks"
        className="relative scroll-mt-24 px-4 pb-24 sm:px-6 md:pb-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* SECTION TITLE */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end">

            <div className="fade-animation">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-1 w-10 rounded-full bg-purple-600" />

                <p className="text-[10px] font-black uppercase tracking-[.25em] text-purple-600 sm:text-xs">
                  The Collection
                </p>
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                React Hooks
                <span className="text-purple-600"> Library.</span>
              </h2>

              <p className="mt-3 text-sm text-gray-500 sm:text-base">
                Select a Hook from the collection below.
              </p>

            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-purple-100 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">

              <span className="h-2 w-2 rounded-full bg-green-400" />

              <span className="text-xs font-bold text-gray-500">
                19 Available Hooks
              </span>

            </div>

          </div>

          {/* BUTTONS MAIN CONTAINER */}
          <div className="glass rounded-3xl border border-white p-4 shadow-[0_25px_80px_-30px_rgba(124,87,190,.25)] sm:rounded-[35px] sm:p-7 md:p-10 lg:p-12">

            <div className="mb-7 flex items-center justify-between border-b border-purple-100 pb-5">

              <div>
                <h3 className="text-base font-black text-gray-800 sm:text-lg">
                  Available Hooks
                </h3>

                <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                  Explore the complete collection
                </p>
              </div>

              <div className="rounded-full bg-purple-50 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-purple-600 sm:px-4 sm:text-[10px]">
                All Available
              </div>

            </div>

            {/* RESPONSIVE GRID
                Mobile: 2 columns
                Tablet: 3 columns
                Desktop: 4 columns
            */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">

              {hookNames.map((name, index) => (

                <button
                  key={name}
                  type="button"
                  style={{ "--i": index }}
                  className="hook-card group relative flex min-h-[75px] items-center justify-between overflow-hidden rounded-xl border border-purple-100 bg-gradient-to-br from-white to-[#f8f5ff] px-3 py-4 text-left shadow-sm transition-all duration-300 sm:min-h-[85px] sm:rounded-2xl sm:px-4 sm:py-5 lg:px-5"
                >

                  {/* HOVER BACKGROUND */}
                  <span className="hover-bg pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 opacity-0 transition-opacity duration-300" />

                  {/* BUTTON CONTENT */}
                  <span className="relative flex min-w-0 items-center gap-2 sm:gap-3">

                    <span className="hook-number flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-[10px] font-black text-purple-600 sm:h-10 sm:w-10 sm:rounded-xl sm:text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="hook-title min-w-0 break-words text-[11px] font-bold leading-5 tracking-tight text-[#51436d] transition-colors sm:text-sm lg:text-[13px] xl:text-sm">
                      {name}
                    </span>

                  </span>

                  {/* ARROW */}
                  <span className="hook-arrow relative ml-1 shrink-0 text-base text-purple-400 sm:text-lg">
                    →
                  </span>

                </button>

              ))}

            </div>

            {/* BOTTOM INFO */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-purple-100 pt-6 sm:flex-row">

              <p className="text-center text-[10px] text-gray-400 sm:text-left sm:text-xs">
                Crafted for developers who love React.
              </p>

              <span className="rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-[10px] font-bold text-purple-600 sm:text-xs">
                19 / 19 Hooks Listed
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="relative border-t border-purple-100 bg-white/80 px-4 py-8 backdrop-blur-xl sm:px-6"
      >

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

          <a href="#" className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 font-black text-white">
              H
            </div>

            <span className="font-black text-gray-800">
              React<span className="text-purple-600">Hooks</span>
            </span>

          </a>

          <p className="text-center text-[10px] text-gray-400 sm:text-xs">
            Explore the React Hooks Collection · Keep Building.
          </p>

          <a
            href="#home"
            className="rounded-xl bg-purple-50 px-5 py-3 text-xs font-bold text-purple-600 transition hover:bg-purple-600 hover:text-white"
          >
            Back to Top ↑
          </a>

        </div>

      </footer>

    </div>
    
  )
}

export default Hooks