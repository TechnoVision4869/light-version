import { useContext, useEffect, useRef, useState } from "react";

import { SidebarContext } from "../store/SidebarContextProvider";
import { MainContext } from "../store/MainContextProvider";
import { getFaqCategories } from "../lib/faqCategories";
// joinFriendly is unused while the tooltip below is temporarily disabled.
import { COMPARE_UPDATED_EVENT } from "../lib/compareStorage";
import ChatbotButton from "./buttons/ChatbotButton";
import ChatbotPanel from "./ChatbotPanel";

export const BOT_NAME = "Lumi";
const GREETING = `Hi, I'm ${BOT_NAME}! Ask me anything about this project.`;
const TOOLTIP_DURATION_MS = 6000;
const TYPING_DELAY_MS = 2000;

let messageIdCounter = 0;
function nextMessageId() {
  messageIdCounter += 1;
  return messageIdCounter;
}

// Owns the chatbot's persistent state (message history, open/closed) at this level, above
// ChatbotPanel, so navigating between layers or toggling the panel closed and back open never
// resets the conversation — only a full app reload does.
export default function ChatbotWidget() {
  const { currentItem, activeLayer, currentProject } = useContext(SidebarContext);
  const { openPaymentPlan, openCompare } = useContext(MainContext);

  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState(() => [{ id: nextMessageId(), role: "bot", text: GREETING }]);
  // Temporarily disabled along with the tooltip effect/render below.
  // const [tooltip, setTooltip] = useState(null);

  // The compare list lives in localStorage, not React state — re-render on its own update event
  // (same pattern as CompareButton.jsx) so the "Compare units" chip/tooltip react to it too.
  const [, bumpCompareTick] = useState(0);
  useEffect(() => {
    const handleUpdate = () => bumpCompareTick((n) => n + 1);
    window.addEventListener(COMPARE_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(COMPARE_UPDATED_EVENT, handleUpdate);
  }, []);

  const categories = getFaqCategories({ currentItem, activeLayer, currentProject, openPaymentPlan, openCompare });
  const availableCategories = categories.filter((category) => category.available);
  // Only fed the (disabled) tooltip effect below.
  // const availableIdsKey = availableCategories.map((category) => category.id).join(",");

  // Temporarily disabled along with the `tooltip` state above and its render below.
  // const previousAvailableIdsRef = useRef(null);
  // const tooltipTimeoutRef = useRef(null);
  //
  // // Fun nudge when navigating reveals new things to ask about — skipped on first mount (nothing
  // // to compare against yet) and while the chat is already open (no need to nudge someone who's
  // // already talking to the bot).
  // useEffect(() => {
  //   const currentIds = new Set(availableCategories.map((category) => category.id));
  //   const previousIds = previousAvailableIdsRef.current;
  //   previousAvailableIdsRef.current = currentIds;
  //
  //   if (!previousIds || showChatbot) return;
  //
  //   const newlyAvailable = availableCategories.filter((category) => !previousIds.has(category.id));
  //   if (newlyAvailable.length === 0) return;
  //
  //   const topics = newlyAvailable.slice(0, 2).map((category) => category.topic);
  //   const suffix = newlyAvailable.length > 2 ? ", and more" : "";
  //   setTooltip(`😃 You can now ask me about ${joinFriendly(topics)}${suffix}!`);
  //
  //   clearTimeout(tooltipTimeoutRef.current);
  //   tooltipTimeoutRef.current = setTimeout(() => setTooltip(null), TOOLTIP_DURATION_MS);
  //   // availableCategories is derived fresh each render; availableIdsKey is its stable fingerprint.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [availableIdsKey, showChatbot]);
  //
  // useEffect(() => () => clearTimeout(tooltipTimeoutRef.current), []);

  // Pending "typing..." bubbles, keyed by their message id, so each resolves independently even
  // if the user taps multiple chips before the first reply lands.
  const typingTimeoutsRef = useRef(new Set());
  useEffect(() => () => typingTimeoutsRef.current.forEach(clearTimeout), []);

  const handleTap = (category) => {
    const botText = category.answer ? category.answer() : category.confirmText;
    const typingId = nextMessageId();

    setMessages((prev) => [
      ...prev,
      { id: nextMessageId(), role: "user", text: category.label },
      { id: typingId, role: "bot", typing: true },
    ]);

    if (category.action) {
      category.action();
    } else if (category.href) {
      window.open(category.href, "_blank", "noopener,noreferrer");
    }

    const timeoutId = setTimeout(() => {
      typingTimeoutsRef.current.delete(timeoutId);
      setMessages((prev) => prev.map((message) => (
        message.id === typingId ? { id: typingId, role: "bot", text: botText } : message
      )));
    }, TYPING_DELAY_MS);
    typingTimeoutsRef.current.add(timeoutId);
  };

  const handleToggle = () => {
    // setTooltip(null);
    // setShowChatbot((shown) => !shown);
  };

  return (
    <>
      <div className="absolute bottom-2 left-2 z-25">
        <ChatbotButton onClick={handleToggle} />
      </div>

      {/* Temporarily disabled along with handleToggle above.
      {tooltip && !showChatbot && (
        <button
          className="absolute bottom-2 left-16 z-25 max-w-[220px] text-left text-xs bg-[#59A198] text-white px-3 py-2 rounded-2xl rounded-bl-sm shadow-lg"
          onClick={handleToggle}
        >
          {tooltip}
        </button>
      )}
      */}

      {showChatbot && (
        <div className="absolute bottom-2 left-16 z-25">
          <ChatbotPanel
            botName={BOT_NAME}
            messages={messages}
            categories={availableCategories}
            onTap={handleTap}
            onClose={() => setShowChatbot(false)}
          />
        </div>
      )}
    </>
  );
}
