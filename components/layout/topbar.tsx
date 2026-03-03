"use client";

import { User } from "lucide-react";
import StatusBadge from "@/components/cards/status-badge";
import { pumpData } from "@/lib/mock-data";

interface TopbarProps {
    selectedPump: string;
    onPumpChange: (pump: string) => void;
    healthIndex: number;
}

export default function Topbar({
    selectedPump,
    onPumpChange,
    healthIndex,
}: TopbarProps) {
    const status =
        healthIndex >= 80 ? "Healthy" : healthIndex >= 60 ? "Warning" : "Critical";

    // Example last updated timestamp
    const lastUpdated = "03 Mar 2026, 12:55 PM";

    return (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-700 dark:bg-slate-900">
            {/* Left */}
            <div className="flex items-center gap-4">
                <h1 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-slate-100">
                    Vacuum Pump Analytics
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 sm:gap-5">
                {/* Pump ID Dropdown */}
                <select
                    value={selectedPump}
                    onChange={(e) => onPumpChange(e.target.value)}
                    className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-gray-100 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    {Object.keys(pumpData).map((pump) => (
                        <option key={pump} value={pump}>
                            {pump}
                        </option>
                    ))}
                </select>

                {/* Status LED */}
                <span className="hidden sm:inline-flex">
                    <StatusBadge status={status} />
                </span>

                {/* Last Updated */}
                <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:inline-block">
                    Updated: {lastUpdated}
                </span>

                {/* User Avatar */}
                <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-slate-200 sm:flex dark:bg-slate-700">
                    <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </div>
            </div>
        </header>
    );
}
