import { useState, useOptimistic, useId, useTransition } from "react";

/* =========================================
   EXAMPLE 01: INSTANT COMMENTS BOX 🌲
   (useOptimistic দিয়ে ইনস্ট্যান্ট কমেন্ট যোগ করা)
========================================= */

function InstantCommentsExample() {
  const [comments, setComments] = useState([
    { id: 1, text: "Exploring the serene beauty of the forest! 🌲" },
    { id: 2, text: "Rivers flow with so much peace. 🌊" },
  ]);
  const [isPending, startTransition] = useTransition();

  // useOptimistic হুক দিয়ে কমেন্ট লিস্টের অপ্টিমিস্টিক স্টেট তৈরি করা হলো
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newCommentText) => [
      ...state,
      { id: Date.now(), text: newCommentText, pending: true },
    ]
  );

  const inputId = useId();

  const handleAddComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const commentText = formData.get("comment");
    if (!commentText.trim()) return;

    e.currentTarget.reset();

    startTransition(async () => {
      // ইনস্ট্যান্ট ইউআই দেখানোর জন্য অপ্টিমিস্টিক আপডেট কল করা হলো
      addOptimisticComment(commentText);

      // সিমুলেটেড সার্ভার রিকোয়েস্ট (২ সেকেন্ড ডিলে)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // রিয়েল স্টেট আপডেট
      setComments((prev) => [
        ...prev,
        { id: Date.now(), text: commentText, pending: false },
      ]);
    });
  };

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Example 01 🌲
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Instant Comment Box
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Showing optimistic updates instantly using <code className="text-purple-600">useOptimistic</code>.
        </p>
      </div>

      <div className="my-4 max-h-36 overflow-y-auto space-y-2 pr-1">
        {optimisticComments.map((c) => (
          <div
            key={c.id}
            className={`rounded-xl p-3 text-xs transition-all ${
              c.pending ? "bg-purple-50 text-purple-700 italic opacity-80" : "bg-gray-50 text-gray-700 font-semibold"
            }`}
          >
            {c.text} {c.pending && <span className="float-right text-[10px] animate-pulse">Posting... ⏳</span>}
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="space-y-3">
        <input
          id={inputId}
          type="text"
          name="comment"
          placeholder="Write a nature comment..."
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-xs focus:border-purple-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700 disabled:opacity-50"
        >
          Post Comment 🍃
        </button>
      </form>
    </div>
  );
}


/* =========================================
   EXAMPLE 02: LIKE & HEART COUNTER 🍃
   (ইনস্ট্যান্ট লাইক কাউন্ট বাড়ানোর জন্য useOptimistic)
========================================= */

function InstantLikeExample() {
  const [likes, setLikes] = useState(12);
  const [isLiked, setIsLiked] = useState(false);
  const [, startTransition] = useTransition();

  // অপ্টিমিস্টিক লাইক স্টেট
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    { count: likes, liked: isLiked },
    (state) => ({
      count: state.liked ? state.count - 1 : state.count + 1,
      liked: !state.liked,
    })
  );

  const handleToggleLike = async () => {
    startTransition(async () => {
      setOptimisticLikes(); // ইনস্ট্যান্ট ইউআই আপডেট

      // সার্ভার রেসপন্স ডিলে সিমুলেশন
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);
    });
  };

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-100/30 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
          Example 02 🍃
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Instant Like Counter
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Updating heart counts instantly before server confirmation.
        </p>
      </div>

      <div className="my-8 text-center">
        <button
          onClick={handleToggleLike}
          className={`group inline-flex items-center gap-2 rounded-2xl px-6 py-4 transition-all duration-300 shadow-md ${
            optimisticLikes.liked
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-green-50 text-gray-700 border border-green-200 hover:bg-green-100"
          }`}
        >
          <span className="text-2xl transition-transform group-hover:scale-125">
            {optimisticLikes.liked ? "❤️" : "🤍"}
          </span>
          <span className="text-sm font-extrabold">
            {optimisticLikes.count} Likes
          </span>
        </button>
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Click rapidly to test responsive optimistic state transitions.
      </p>
    </div>
  );
}


/* =========================================
   EXAMPLE 03: TODO LIST MANAGER 🌊
   (টডু আইটেম ইনস্ট্যান্ট যোগ করার উদাহরণ)
========================================= */

function OptimisticTodoExample() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Plant green saplings 🌲" },
    { id: 2, name: "Water garden flowers 🌸" },
  ]);
  const [isPending, startTransition] = useTransition();

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodoText) => [
      ...state,
      { id: Date.now(), text: newTodoText, optimistic: true },
    ]
  );

  const todoInputId = useId();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("todoText");
    if (!text.trim()) return;

    e.currentTarget.reset();

    startTransition(async () => {
      addOptimisticTodo(text);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTodos((prev) => [...prev, { id: Date.now(), text }]);
    });
  };

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/30 md:col-span-2 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Example 03 🌊
        </span>
        <h2 className="mt-1 text-xl font-extrabold text-gray-800">
          Optimistic Todo Manager
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Adding items to list instantly with asynchronous confirmation handling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {optimisticTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex justify-between items-center rounded-xl p-3 text-xs font-semibold shadow-sm ${
                todo.optimistic ? "bg-blue-50/70 text-blue-700 italic" : "bg-blue-50 text-blue-900"
              }`}
            >
              <span>{todo.text}</span>
              {todo.optimistic && <span className="text-[10px] animate-pulse">Syncing... ⏳</span>}
            </div>
          ))}
        </div>

        <form onSubmit={handleAddTodo} className="space-y-3 flex flex-col justify-center">
          <div>
            <label htmlFor={todoInputId} className="block text-xs font-bold text-gray-700 mb-1">
              New Task Item
            </label>
            <input
              id={todoInputId}
              type="text"
              name="todoText"
              placeholder="e.g., Clean river bank..."
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            Add Task 🌊
          </button>
        </form>
      </div>
    </div>
  );
}


/* =========================================
   MAIN COMPONENT 🌸
========================================= */

export default function UseOptimistic() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="rounded-3xl border border-purple-100 bg-white p-8 text-center shadow-xl shadow-purple-100/50">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            React Hooks Playground 🌲
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
            Mastering <code className="text-purple-600">useOptimistic</code> Hook
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Provide instant feedback to user actions by optimistically updating the UI before server mutations complete.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InstantCommentsExample />
          <InstantLikeExample />
          <OptimisticTodoExample />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-4">
          Built with React <code className="text-purple-600">useOptimistic</code> Hook • Nature Theme 🍃
        </footer>

      </div>
    </div>
  );
}