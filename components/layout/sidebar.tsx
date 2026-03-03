"use client";

import { useTheme } from "@/app/providers";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Wind,
    AlertTriangle,
    Settings,
    Sun,
    Moon,
    X,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Vacuum Pump", icon: Wind, active: false },
    { label: "Alerts", icon: AlertTriangle, active: false },
    { label: "Settings", icon: Settings, active: false },
];

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    const { theme, toggleTheme } = useTheme();

    const sidebarContent = (
        <div className="flex h-full flex-col justify-between">
            {/* Logo */}
            <div>
                <div className="flex items-center gap-3 px-6 py-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
                        <Wind className="h-5 w-5 text-white dark:text-slate-900" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Zydus
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Industrial Intelligence
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-2 space-y-1 px-3">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                item.active
                                    ? "bg-gray-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                                    : "text-slate-500 hover:bg-gray-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                            )}
                        >
                            <item.icon className="h-[18px] w-[18px]" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Theme Toggle */}
            <div className="px-3 pb-6">
                <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-gray-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                >
                    {theme === "light" ? (
                        <Moon className="h-[18px] w-[18px]" />
                    ) : (
                        <Sun className="h-[18px] w-[18px]" />
                    )}
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar — permanently visible */}
            <aside className="hidden lg:flex lg:w-[260px] lg:flex-shrink-0 lg:flex-col border-r border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                {sidebarContent}
            </aside>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Mobile Drawer */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[260px] transform border-r border-gray-200 bg-white transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 lg:hidden",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-4 rounded-md p-1.5 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                    <X className="h-5 w-5" />
                </button>
                {sidebarContent}
            </aside>
        </>
    );
}
