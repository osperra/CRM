"use client";

import { createContext, useContext, useState } from "react";

type ChatUIContextType = {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const ChatUIContext = createContext<ChatUIContextType | undefined>(undefined);

export function ChatUIProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatUIContext.Provider
      value={{
        isChatOpen,
        openChat: () => setIsChatOpen(true),
        closeChat: () => setIsChatOpen(false),
        toggleChat: () => setIsChatOpen((prev) => !prev),
      }}
    >
      {children}
    </ChatUIContext.Provider>
  );
}

export function useChatUI() {
  const ctx = useContext(ChatUIContext);
  if (!ctx) throw new Error("useChatUI must be used inside ChatUIProvider");
  return ctx;
}
