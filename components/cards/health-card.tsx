"use client";

import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    PolarAngleAxis,
} from "recharts";

interface HealthCardProps {
    value: number;
}

function getHealthColor(value: number): string {
    if (value >= 80) return "#16a34a";
    if (value >= 60) return "#facc15";
    return "#dc2626";
}

export default function HealthCard({ value }: HealthCardProps) {
    const color = getHealthColor(value);
    const data = [{ name: "Health", value, fill: color }];

    return (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800 dark:shadow-md">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Machine Health Index
            </p>

            <div className="relative mt-2 h-[160px] w-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="75%"
                        outerRadius="100%"
                        barSize={14}
                        data={data}
                        startAngle={225}
                        endAngle={-45}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: "var(--border)" }}
                            dataKey="value"
                            cornerRadius={10}
                            angleAxisId={0}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {value}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        / 100
                    </span>
                </div>
            </div>

            <p
                className="mt-1 text-xs font-semibold"
                style={{ color }}
            >
                {value >= 80 ? "Good" : value >= 60 ? "Fair" : "Critical"}
            </p>
        </div>
    );
}
