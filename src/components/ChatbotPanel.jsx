import { useEffect, useRef } from "react";

export default function ChatbotPanel({ botName, messages, categories, onTap, onClose }) {
  const threadRef = useRef(null);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
    // Re-scroll both when a message is appended and when the typing bubble it left behind
    // resolves into real text (same message id/count, different content).
  }, [messages.length, lastMessage?.text, lastMessage?.typing]);

  return (
    <div className="w-[320px] h-[440px] rounded-xl bg-[#2e2e2e] text-white flex flex-col shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 p-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#59A198]/40 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-semibold text-sm flex-1">{botName}</h2>
        <button onClick={onClose} className="text-white/70 hover:text-white text-xl leading-none" aria-label="Close">
          &times;
        </button>
      </div>

      <div ref={threadRef} className="flex-1 overflow-y-auto scrollbar-custom p-3 flex flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] text-sm whitespace-pre-line px-3 py-2 rounded-2xl ${
              message.role === "bot"
                ? "self-start bg-[#59A198]/25 rounded-bl-sm"
                : "self-end bg-white/15 rounded-br-sm"
            }`}
          >
            {message.typing ? (
              <div className="flex items-center gap-1 py-0.5" aria-label="Typing">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              message.text
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 p-3 border-t border-white/10">
        {categories.map((category) => (
          <button
            key={category.id}
            className="text-xs px-3 py-1.5 rounded-full border border-white/25 hover:bg-white/10 transition"
            onClick={() => onTap(category)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
