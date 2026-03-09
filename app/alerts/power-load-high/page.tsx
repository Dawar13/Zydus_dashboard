"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Wrench,
    Search,
    AlertTriangle,
    ShieldCheck,
    Bot,
    CalendarClock,
    CheckCircle2,
    Zap,
    Cable,
    RotateCcw,
    Settings,
    Clock as ClockIcon,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
} from "recharts";
import ChatbotFab from "@/components/chatbot/chatbot-fab";
import ChatbotModal from "@/components/chatbot/chatbot-modal";
import { cn } from "@/lib/utils";

/* ─── Mock Data ──────────────────────────────────────────────────────── */

const CURRENT_POWER = 14.5;
const NORMAL_POWER = 14.0;
const EXCESS_KW = 0.5;

function generatePowerTrend() {
    const points = 36;
    const now = new Date();
    return Array.from({ length: points }, (_, i) => {
        const t = new Date(now.getTime() - (points - i - 1) * 10 * 60000);
        const hours = t.getHours().toString().padStart(2, "0");
        const mins = t.getMinutes().toString().padStart(2, "0");
        const progress = i / points;
        const base = 13.2 + progress * 1.8;
        const noise = (Math.random() - 0.5) * 0.8;
        return {
            time: `${hours}:${mins}`,
            value: parseFloat((base + noise).toFixed(2)),
        };
    });
}

const trendData = generatePowerTrend();

const overloadPercent = Math.round((EXCESS_KW / NORMAL_POWER) * 100);
const gaugeData = [
    { name: "Power", value: Math.min(overloadPercent * 3, 100), fill: "#f59e0b" },
];

const timelineEvents = [
    {
        time: "09:20 AM",
        label: "Power load stable within normal range",
        color: "bg-green-400",
    },
    {
        time: "09:48 AM",
        label: "Power draw begins increasing gradually",
        color: "bg-yellow-400",
    },
    {
        time: "10:05 AM",
        label: "Alert triggered — 0.5 kW above normal",
        color: "bg-orange-500",
    },
];

const possibleCauses = [
    {
        icon: RotateCcw,
        title: "Increased Mechanical Friction",
        desc: "Bearing wear or misalignment causes the motor to draw more power to maintain speed.",
    },
    {
        icon: Cable,
        title: "Electrical Supply Fluctuation",
        desc: "Voltage drops or phase imbalance force the motor to compensate with higher current draw.",
    },
    {
        icon: Zap,
        title: "Process Load Change",
        desc: "Upstream process changes may have increased the gas load on the vacuum pump.",
    },
    {
        icon: Settings,
        title: "Degraded Pump Internals",
        desc: "Worn vanes, rotors, or seals increase internal losses, driving up energy consumption.",
    },
];

const recommendedActions = [
    {
        icon: Search,
        step: 1,
        title: "Monitor power draw trend over next 2 hours",
        desc: "Determine if the increase is transient or persistent before taking action.",
    },
    {
        icon: Wrench,
        step: 2,
        title: "Check motor bearings and alignment",
        desc: "Inspect for vibration, noise, or heat indicating mechanical friction.",
    },
    {
        icon: AlertTriangle,
        step: 3,
        title: "Verify electrical supply quality",
        desc: "Measure voltage, current, and phase balance at the motor terminals.",
    },
    {
        icon: ShieldCheck,
        step: 4,
        title: "Review process parameters",
        desc: "Confirm upstream conditions haven't changed the vacuum demand.",
    },
];

/* ─── Page Component ─────────────────────────────────────────────────── */

export default function PowerLoadIncreasedPage() {
    const router = useRouter();
    const [chatOpen, setChatOpen] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f6f8] dark:bg-[#0f172a]">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
                {/* ── Back Link ─────────────────────────────────── */}
                <button
                    onClick={() => router.push("/")}
                    className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </button>

                {/* ── Header ─────────────────────────────────────── */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-100">
                            Elevated Power Load Detected
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Power consumption is {EXCESS_KW} kW above the normal operating range.
                        </p>
                    </div>
                    <span className="inline-flex w-fit items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400">
                        Warning
                    </span>
                </div>

                {/* ── Issue Visualization ─────────────────────────── */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                    {/* Gauge */}
                    <div className="flex items-center justify-center rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800 dark:shadow-md">
                        <div className="flex flex-col items-center">
                            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Power Overload Indicator
                            </p>
                            <ResponsiveContainer width={220} height={180}>
                                <RadialBarChart
                                    cx="50%"
                                    cy="100%"
                                    innerRadius="80%"
                                    outerRadius="100%"
                                    barSize={16}
                                    data={gaugeData}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <PolarAngleAxis
                                        type="number"
                                        domain={[0, 100]}
                                        tick={false}
                                        angleAxisId={0}
                                    />
                                    <RadialBar
                                        background={{ fill: "var(--border)" }}
                                        dataKey="value"
                                        cornerRadius={10}
                                        angleAxisId={0}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <span className="mt-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                                +{EXCESS_KW} kW
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                above normal range
                            </span>
                        </div>
                    </div>

                    {/* Comparison Card */}
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800 dark:shadow-md">
                        <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Power Load Summary
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-700/50">
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    Current Power
                                </span>
                                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {CURRENT_POWER} kW
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-700/50">
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    Normal Operating Range
                                </span>
                                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    ≤ {NORMAL_POWER} kW
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border-2 border-yellow-200 bg-yellow-50 px-4 py-3 dark:border-yellow-900/50 dark:bg-yellow-950/30">
                                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                                    Excess Load
                                </span>
                                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                                    +{EXCESS_KW} kW
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Power Trend Chart ───────────────────────────── */}
                <div className="mb-6 rounded-xl bg-white p-3 shadow-sm sm:p-5 dark:bg-slate-800 dark:shadow-md">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Power Load Trend — Last 6 Hours
                    </h3>
                    <div className="mt-4 h-[220px] sm:h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient
                                        id="colorPowerLoad"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#f59e0b"
                                            stopOpacity={0.35}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#f59e0b"
                                            stopOpacity={0}
                                        />
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
                                    width={45}
                                    domain={[12, 16]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--bg-card)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                    }}
                                    formatter={(value: number | undefined) => [
                                        `${value ?? "—"} kW`,
                                        "Power",
                                    ]}
                                />
                                <ReferenceLine
                                    y={NORMAL_POWER}
                                    stroke="#dc2626"
                                    strokeDasharray="6 4"
                                    strokeWidth={2}
                                    label={{
                                        value: `Normal Max (${NORMAL_POWER} kW)`,
                                        position: "right",
                                        fill: "#dc2626",
                                        fontSize: 11,
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPowerLoad)"
                                    isAnimationActive={true}
                                    animationDuration={600}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ── Status Timeline ─────────────────────────────── */}
                <div className="mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800 dark:shadow-md">
                    <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Event Timeline
                    </h3>
                    <div className="relative ml-3 border-l-2 border-slate-200 pl-6 dark:border-slate-700">
                        {timelineEvents.map((ev, i) => (
                            <div key={i} className="relative pb-6 last:pb-0">
                                <span
                                    className={cn(
                                        "absolute -left-[31px] top-0.5 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-slate-800",
                                        ev.color
                                    )}
                                />
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                                    <ClockIcon className="mr-1 inline h-3 w-3" />
                                    {ev.time}
                                </p>
                                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {ev.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Possible Causes ─────────────────────────────── */}
                <div className="mb-6">
                    <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Possible Causes
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {possibleCauses.map((cause) => {
                            const Icon = cause.icon;
                            return (
                                <div
                                    key={cause.title}
                                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
                                            <Icon className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                            {cause.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        {cause.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Recommended Actions ─────────────────────────── */}
                <div className="mb-8">
                    <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Recommended Inspection Steps
                    </h3>
                    <div className="space-y-3">
                        {recommendedActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <div
                                    key={action.step}
                                    className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                        <Icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                            <span className="mr-1.5 text-slate-400">
                                                {action.step}.
                                            </span>
                                            {action.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                            {action.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── CTA Buttons ─────────────────────────────────── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                        onClick={() => setChatOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] dark:bg-slate-100 dark:text-slate-900"
                    >
                        <Bot className="h-4 w-4" />
                        Diagnose with AI Assistant
                    </button>
                    <button
                        onClick={() => console.log("Maintenance scheduled")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                        <CalendarClock className="h-4 w-4" />
                        Schedule Maintenance
                    </button>
                    <button
                        onClick={() => setAcknowledged(!acknowledged)}
                        className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98]",
                            acknowledged
                                ? "border border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
                                : "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        )}
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        {acknowledged ? "Alert Acknowledged" : "Acknowledge Alert"}
                    </button>
                </div>
            </div>

            <ChatbotFab onClick={() => setChatOpen(true)} />
            <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />
        </div>
    );
}
