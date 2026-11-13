import { createContext, useContext, useState } from "react";


/* =========================================
   CREATE CONTEXTS 🌲
========================================= */

const ThemeContext = createContext();
const LanguageContext = createContext();
const CartContext = createContext();
const AuthContext = createContext();
const NotificationContext = createContext();


/* =========================================
   01. THEME PROVIDER ☀️
========================================= */

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


/* =========================================
   02. LANGUAGE PROVIDER 🍃
========================================= */

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((previous) =>
      previous === "en" ? "es" : "en"
    );
  };

  const translations = {
    en: {
      welcome: "Welcome to My Application",
      description: "Explore React useContext Hook",
      dashboard: "Dashboard",
      settings: "Settings",
      profile: "My Profile",
      cart: "Shopping Cart",
    },

    es: {
      welcome: "Bienvenido a mi aplicación",
      description: "Explora el Hook React useContext",
      dashboard: "Panel",
      settings: "Ajustes",
      profile: "Mi Perfil",
      cart: "Carrito de Compras",
    },
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        text: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}


/* =========================================
   03. SHOPPING CART PROVIDER 🌿
========================================= */

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previous,
        { ...product, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + amount),
              }
            : item
        )
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


/* =========================================
   04. AUTH PROVIDER 🌸
========================================= */

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      name: "John Smith",
      email: "john@example.com",
      role: "Administrator",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}


/* =========================================
   05. NOTIFICATION PROVIDER 🌊
========================================= */

function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification("");
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}


/* =========================================
   THEME EXAMPLE 🌲
========================================= */

function ThemeExample() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <section className={`rounded-3xl border p-6 transition ${
      darkMode
        ? "border-gray-700 bg-gray-800 text-white"
        : "border-purple-100 bg-white text-gray-800"
    }`}>

      <div className="mb-5 flex items-center justify-between">

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Example 01 🌲
          </span>

          <h2 className="mt-1 text-xl font-extrabold">
            🎨 Theme Switcher
          </h2>
        </div>

        <span className="text-3xl">
          {darkMode ? "🌙" : "☀️"}
        </span>

      </div>

      <div className={`rounded-2xl p-5 ${
        darkMode ? "bg-gray-700" : "bg-purple-50"
      }`}>

        <h3 className="text-lg font-bold">
          {darkMode ? "Dark Mode Active" : "Light Mode Active"}
        </h3>

        <p className={`mt-2 text-sm ${
          darkMode ? "text-gray-300" : "text-gray-500"
        }`}>
          Change the theme and see this section update.
        </p>

        <button
          onClick={toggleTheme}
          className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
        >
          {darkMode ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
        </button>

      </div>

    </section>
  );
}


/* =========================================
   LANGUAGE EXAMPLE 🍃
========================================= */

function LanguageExample() {
  const {
    language,
    toggleLanguage,
    text,
  } = useContext(LanguageContext);

  return (
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Example 02 🍃
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-gray-800">
            🌐 Language Switcher
          </h2>
        </div>

        <span className="text-3xl">🌍</span>

      </div>

      <div className="rounded-2xl bg-blue-50 p-5">

        <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          {language === "en" ? "English" : "Spanish"}
        </span>

        <h3 className="mt-4 text-xl font-extrabold text-gray-800">
          {text.welcome}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {text.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-semibold text-blue-700">
          <div className="rounded-lg bg-white p-3">
            {text.dashboard}
          </div>
          <div className="rounded-lg bg-white p-3">
            {text.settings}
          </div>
          <div className="rounded-lg bg-white p-3">
            {text.profile}
          </div>
          <div className="rounded-lg bg-white p-3">
            {text.cart}
          </div>
        </div>

        <button
          onClick={toggleLanguage}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          {language === "en" ? "Switch to Spanish" : "Switch to English"}
        </button>

      </div>

    </section>
  );
}


/* =========================================
   SHOPPING CART EXAMPLE 🌿
========================================= */

const products = [
  { id: 1, name: "Wireless Headphones", price: 2500, icon: "🎧" },
  { id: 2, name: "Smart Watch", price: 3500, icon: "⌚" },
  { id: 3, name: "Laptop Bag", price: 1800, icon: "💼" },
  { id: 4, name: "Keyboard", price: 1200, icon: "⌨️" },
];

function ShoppingExample() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  const { showNotification } = useContext(NotificationContext);

  const handleAdd = (product) => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    showNotification("Product removed from cart!");
  };

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/40">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-green-600">
            Example 03 🌿
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-gray-800">
            🛒 Shopping Cart
          </h2>
        </div>

        <span className="rounded-xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
          {totalItems} Items
        </span>

      </div>


      {/* Products */}

      <h3 className="mb-3 text-sm font-bold text-gray-700">
        Available Products
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {products.map((product) => (

          <div
            key={product.id}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-green-200 hover:bg-green-50/40"
          >

            <span className="text-3xl">
              {product.icon}
            </span>

            <div className="min-w-0 flex-1">

              <p className="text-sm font-bold text-gray-700">
                {product.name}
              </p>

              <p className="mt-1 text-xs font-semibold text-green-600">
                {formatMoney(product.price)}
              </p>

            </div>

            <button
              onClick={() => handleAdd(product)}
              className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-700"
            >
              Add
            </button>

          </div>

        ))}

      </div>


      {/* Cart Items */}

      <div className="mt-7">

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">
            Your Cart
          </h3>

          <span className="text-xs text-gray-400">
            {cart.length} Products
          </span>
        </div>

        {cart.length === 0 ? (

          <div className="rounded-xl border-2 border-dashed border-green-100 py-8 text-center">
            <div className="mb-2 text-3xl">🛒</div>
            <p className="text-sm text-gray-400">
              Your shopping cart is empty.
            </p>
          </div>

        ) : (

          <div className="space-y-3">

            {cart.map((item) => (

              <div
                key={item.id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-green-50/60 p-3"
              >

                <span className="text-2xl">{item.icon}</span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatMoney(item.price)} each
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="h-7 w-7 rounded-lg bg-white font-bold text-gray-600"
                  >
                    −
                  </button>

                  <span className="min-w-5 text-center text-sm font-bold text-gray-700">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="h-7 w-7 rounded-lg bg-white font-bold text-gray-600"
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="rounded-lg px-2 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* Total */}

      <div className="mt-5 flex items-center justify-between rounded-xl bg-green-600 p-4 text-white">

        <span className="text-sm font-semibold">
          Total Amount
        </span>

        <span className="text-xl font-extrabold">
          {formatMoney(totalPrice)}
        </span>

      </div>

    </section>
  );
}


/* =========================================
   AUTHENTICATION EXAMPLE 🌸
========================================= */

function AuthExample() {
  const { user, login, logout } = useContext(AuthContext);

  const { showNotification } = useContext(NotificationContext);

  const handleLogin = () => {
    login();
    showNotification("You have successfully logged in!");
  };

  const handleLogout = () => {
    logout();
    showNotification("You have logged out!");
  };

  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-lg shadow-orange-100/40">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Example 04 🌸
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-gray-800">
            🔐 User Authentication
          </h2>
        </div>

        <span className="text-3xl">👤</span>

      </div>


      {user ? (

        <div className="rounded-2xl bg-green-50 p-5">

          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-200 text-2xl">
              👨
            </div>

            <div>
              <h3 className="font-extrabold text-gray-800">
                {user.name}
              </h3>

              <p className="text-xs text-gray-500">
                {user.role}
              </p>
            </div>

            <span className="ml-auto rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              Online
            </span>

          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs text-gray-400">Email Address</p>
            <p className="mt-1 break-all text-sm font-semibold text-gray-700">
              {user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-5 w-full rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      ) : (

        <div className="rounded-2xl bg-orange-50 p-6 text-center">

          <div className="mb-3 text-5xl">🔒</div>

          <h3 className="text-lg font-extrabold text-gray-800">
            Welcome Guest!
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Please login to view your profile.
          </p>

          <button
            onClick={handleLogin}
            className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Login Now
          </button>

        </div>

      )}

    </section>
  );
}


/* =========================================
   NOTIFICATION EXAMPLE 🌊
========================================= */

function NotificationExample() {
  const {
    notification,
    showNotification,
    clearNotification,
  } = useContext(NotificationContext);

  return (
    <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-lg shadow-indigo-100/40">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Example 05 🌊
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-gray-800">
            🔔 Notification System
          </h2>
        </div>

        <span className="text-3xl">📢</span>

      </div>

      <p className="mb-5 text-sm text-gray-500">
        Trigger notifications from different actions.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        <button
          onClick={() => showNotification("Your profile has been updated!")}
          className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
        >
          👤 Profile Updated
        </button>

        <button
          onClick={() => showNotification("Your changes have been saved!")}
          className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 transition hover:bg-green-100"
        >
          💾 Save Changes
        </button>

        <button
          onClick={() => showNotification("A new message has arrived!")}
          className="rounded-xl bg-purple-50 px-4 py-3 text-sm font-bold text-purple-700 transition hover:bg-purple-100"
        >
          💬 New Message
        </button>

        <button
          onClick={() => showNotification("Something needs your attention!")}
          className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-100"
        >
          ⚠️ Show Alert
        </button>

      </div>


      {notification && (

        <div className="mt-5 flex items-start justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

          <div className="flex gap-3">

            <span className="text-xl">✅</span>

            <div>
              <p className="text-sm font-bold text-green-700">
                Notification
              </p>

              <p className="mt-1 text-sm text-green-600">
                {notification}
              </p>
            </div>

          </div>

          <button
            onClick={clearNotification}
            className="font-bold text-green-700"
          >
            ✕
          </button>

        </div>

      )}

    </section>
  );
}


/* =========================================
   MAIN APPLICATION 🌿
========================================= */

function UseContextContent() {
  const { text } = useContext(LanguageContext);

  return (
    <div className="mx-auto max-w-6xl">

      {/* HEADER */}

      <header className="mb-9 text-center">

        <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
          React Hook Playground 🌲
        </span>

        <h1 className="mt-4 text-3xl font-extrabold text-gray-800 sm:text-4xl">
          useContext Examples
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          {text.description}
        </p>

      </header>


      {/* TOP CONTROLS */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">

        <div>
          <p className="font-bold text-gray-800">
            Global Settings
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Control shared application data
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <ThemeControl />

          <LanguageControl />

        </div>

      </div>


      {/* EXAMPLES */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <ThemeExample />

        <LanguageExample />

        <ShoppingExample />

        <AuthExample />

        <div className="lg:col-span-2">
          <NotificationExample />
        </div>

      </div>


      {/* FOOTER */}

      <footer className="mt-9 text-center">

        <p className="text-sm font-semibold text-gray-500">
          Built with React useContext Hook 🍃
        </p>

        <p className="mt-1 text-xs text-gray-400">
          5 Practical Examples • Shared Global State • Context API
        </p>

      </footer>

    </div>
  );
}


/* =========================================
   GLOBAL CONTROLS 🌸
========================================= */

function ThemeControl() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl bg-purple-100 px-4 py-2 text-xs font-bold text-purple-700 transition hover:bg-purple-200"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

function LanguageControl() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-xl bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-200"
    >
      {language === "en" ? "Spanish" : "English"}
    </button>
  );
}


/* =========================================
   ROOT COMPONENT 🌊
========================================= */

export default function UseContext() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <AuthProvider>
            <NotificationProvider>

              <div className="min-h-screen bg-[#f7f5ff] px-4 py-8 sm:px-6 lg:px-8">

                <UseContextContent />

              </div>

            </NotificationProvider>
          </AuthProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}