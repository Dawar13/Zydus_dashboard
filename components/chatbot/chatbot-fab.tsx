"use client";

import { MessageCircle } from "lucide-react";

export default function ChatbotFab() {
    const handleClick = () => {
        window.open("https://chatbot-url", "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl dark:bg-slate-100 dark:text-slate-900"
            aria-label="Open Chatbot"
        >
            <MessageCircle className="h-6 w-6" />
        </button>
    );
}
