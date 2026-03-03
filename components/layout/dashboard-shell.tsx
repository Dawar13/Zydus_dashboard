"use client";

//import { useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Menu } from "lucide-react";

interface DashboardShellProps {
    children: React.ReactNode;
    selectedPump: string;
    onPumpChange: (pump: string) => void;
    healthIndex: number;
}

export default function DashboardShell({
    children,
    selectedPump,
    onPumpChange,
    healthIndex,
}: DashboardShellProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-full min-h-screen">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile hamburger + Topbar */}
                <div className="relative">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-md p-1.5 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="pl-12 lg:pl-0">
                        <Topbar
                            selectedPump={selectedPump}
                            onPumpChange={onPumpChange}
                            healthIndex={healthIndex}
                        />
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f6f8] p-3 sm:p-6 dark:bg-[#0f172a]">
                    {children}
                </main>
            </div>
        </div>
    );
}
