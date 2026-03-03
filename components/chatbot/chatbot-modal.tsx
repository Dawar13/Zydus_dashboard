"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatbotModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ChatbotModal({ open, onClose }: ChatbotModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Slide-in panel */}
            <div
                className={cn(
                    "relative w-full sm:w-[420px] h-full sm:h-[90vh] sm:mt-auto sm:mb-6 sm:mr-6 bg-white dark:bg-slate-900 sm:rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 ease-out",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        AI Diagnostic Assistant
                    </span>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <X className="h-4 w-4 text-gray-500 hover:text-black dark:hover:text-white" />
                    </button>
                </div>

                {/* Iframe */}
                <iframe
                    src="https://zydus-chatbot.vercel.app"
                    className="w-full border-0"
                    style={{ height: "calc(100% - 49px)" }}
                    allow="clipboard-write"
                    title="Zydus AI Diagnostic Assistant"
                />
            </div>
        </div>
    );
}
