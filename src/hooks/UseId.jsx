import { useState, useId } from "react";

/* =========================================
   EXAMPLE 01: ACCESSIBLE FORM FIELD 🌲
   (useId দিয়ে লেবেল এবং ইনপুটের ইউনিক আইডি কানেক্ট করা)
========================================= */

function FormInputExample() {
  const emailId = useId();
  const passwordId = useId();
  const [formData, setFormData] = useState({ email: "", password: "" });

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Accessible Form Inputs
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Using <code className="text-purple-600">useId</code> to bind labels with inputs securely.
        </p>
      </div>

      <div className="space-y-4 mt-4">
        <div>
          <label htmlFor={emailId} className="block text-xs font-bold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id={emailId}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor={passwordId} className="block text-xs font-bold text-gray-700 mb-1">
            Password
          </label>
          <input
            id={passwordId}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: CHECKBOX & TERMS 🍃
   (চেকবাক্স এবং টার্মস কন্ডিশনের জন্য useId)
========================================= */

function CheckboxExample() {
  const termsId = useId();
  const newsletterId = useId();
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Checkbox Preferences
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Clicking labels will toggle the checkboxes via <code className="text-green-600">useId</code>.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <input
            id={termsId}
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          />
          <label htmlFor={termsId} className="text-sm font-medium text-gray-700 cursor-pointer">
            I agree to the terms and conditions
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id={newsletterId}
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          />
          <label htmlFor={newsletterId} className="text-sm font-medium text-gray-700 cursor-pointer">
            Subscribe to our nature newsletter 🌿
          </label>
        </div>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: RANGE SLIDER & HINTS 🌊
   (রেঞ্জ স্লাইডার এবং এরিয়া ডিসক্রিপশনের জন্য useId)
========================================= */

function RangeSliderExample() {
  const sliderId = useId();
  const descriptionId = useId();
  const [volume, setVolume] = useState(50);

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Volume Control Slider
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Connecting aria-describedby with <code className="text-blue-600">useId</code> for screen readers.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label htmlFor={sliderId} className="text-sm font-bold text-gray-700">
            Volume Level
          </label>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            {volume}%
          </span>
        </div>

        <input
          id={sliderId}
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          aria-describedby={descriptionId}
          className="w-full accent-blue-600 cursor-pointer"
        />

        <p id={descriptionId} className="text-xs text-gray-400">
          Adjust the slider to set your preferred system audio volume.
        </p>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 04: PASSWORD STRENGTH HINTS 🌸 (NEW)
   (একাধিক হেন্ট বা ডিসক্রিপশন কানেক্ট করার জন্য useId)
========================================= */

function PasswordHintExample() {
  const inputId = useId();
  const hintId = useId();
  const [password, setPassword] = useState("");

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-lg shadow-orange-100/30">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
          Example 04 🌸
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Secure Password & Hints
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Using <code className="text-orange-600">useId</code> for accessibility hints.
        </p>
      </div>

      <div className="space-y-3">
        <label htmlFor={inputId} className="block text-xs font-bold text-gray-700">
          New Password
        </label>
        <input
          id={inputId}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby={hintId}
          placeholder="At least 8 characters"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none"
        />
        <p id={hintId} className="text-[11px] text-gray-400">
          Must contain numbers, uppercase, and special characters.
        </p>
      </div>
    </div>
  );
}


/* =========================================
   EXAMPLE 05: RADIO GROUP SELECTION ☀️ (NEW)
   (রেডিও বাটনের জন্য ইউনিক আইডি জেনারেট করা)
========================================= */

function RadioGroupExample() {
  const option1Id = useId();
  const option2Id = useId();
  const option3Id = useId();
  const [selectedPlan, setSelectedPlan] = useState("free");

  return (
    <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-lg shadow-teal-100/30">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
          Example 05 ☀️
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Subscription Plan
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Generating unique IDs for radio buttons via <code className="text-teal-600">useId</code>.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          <input
            id={option1Id}
            type="radio"
            name="plan"
            value="free"
            checked={selectedPlan === "free"}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="text-teal-600 focus:ring-teal-500 cursor-pointer"
          />
          <label htmlFor={option1Id} className="text-sm font-medium text-gray-700 cursor-pointer">
            Free Plan 🍃
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id={option2Id}
            type="radio"
            name="plan"
            value="pro"
            checked={selectedPlan === "pro"}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="text-teal-600 focus:ring-teal-500 cursor-pointer"
          />
          <label htmlFor={option2Id} className="text-sm font-medium text-gray-700 cursor-pointer">
            Pro Plan ($10/mo) 🌲
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id={option3Id}
            type="radio"
            name="plan"
            value="enterprise"
            checked={selectedPlan === "enterprise"}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="text-teal-600 focus:ring-teal-500 cursor-pointer"
          />
          <label htmlFor={option3Id} className="text-sm font-medium text-gray-700 cursor-pointer">
            Enterprise Plan ($50/mo) 🌊
          </label>
        </div>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseId() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useId</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Generate unique IDs on both client and server to avoid hydration mismatches and ensure accessibility across forms.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInputExample />
          <CheckboxExample />
          <RangeSliderExample />
          <PasswordHintExample />
          <RadioGroupExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useId</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}