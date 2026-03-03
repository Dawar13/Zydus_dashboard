"use client";

import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { TimeSeriesPoint } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/app/providers";

interface PowerChartProps {
    data: Record<"1h" | "6h" | "24h", TimeSeriesPoint[]>;
}

const filters = ["1h", "6h", "24h"] as const;
type FilterRange = (typeof filters)[number];

export default function PowerChart({ data }: PowerChartProps) {
    const [range, setRange] = useState<FilterRange>("1h");
    const { theme } = useTheme();
    const chartData = data[range];

    const powerColor = theme === "dark" ? "#ffffff" : "#334155";

    return (
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800 dark:shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Power Consumption
                </h3>
                <div className="flex gap-1">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setRange(f)}
                            className={cn(
                                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                                range === f
                                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                                    : "text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={powerColor} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={powerColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                            axisLine={false}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                            axisLine={false}
                            tickLine={false}
                            width={40}
                            domain={["auto", "auto"]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={powerColor}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPower)"
                            isAnimationActive={true}
                            animationDuration={500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
