"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { AlertItem } from "@/lib/mock-data";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface AlertsPanelProps {
    alerts: AlertItem[];
}

const severityConfig = {
    warning: {
        border: "border-l-status-yellow",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        icon: AlertTriangle,
        iconColor: "text-status-yellow",
    },
    critical: {
        border: "border-l-status-red",
        bg: "bg-red-50 dark:bg-red-950/20",
        icon: AlertCircle,
        iconColor: "text-status-red",
    },
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
    const router = useRouter();

    return (
        <div className="rounded-xl bg-white p-3 shadow-sm sm:p-5 dark:bg-slate-800 dark:shadow-md">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Active Alerts
            </h3>

            <div className="mt-4 space-y-3">
                {alerts.map((alert) => {
                    const config = severityConfig[alert.severity];
                    const Icon = config.icon;
                    const isCritical = alert.severity === "critical";

                    return (
                        <div
                            key={alert.id}
                            onClick={
                                isCritical
                                    ? () =>
                                        router.push(
                                            "/alerts/vacuum-deviation"
                                        )
                                    : undefined
                            }
                            className={cn(
                                "flex w-full flex-col sm:flex-row sm:items-start gap-3 rounded-lg border-l-4 p-3 text-left",
                                config.border,
                                config.bg,
                                isCritical &&
                                "cursor-pointer transition-transform hover:scale-[1.01]"
                            )}
                        >
                            <Icon className={cn("mt-0.5 h-4 w-4 flex-shrink-0", config.iconColor)} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                    {alert.message}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                    {alert.timestamp}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
