import { cn } from "@/lib/utils";
import type { MetricData } from "@/lib/mock-data";

interface MetricCardProps {
    data: MetricData;
}

const dotColors = {
    green: "bg-status-green",
    yellow: "bg-status-yellow",
    red: "bg-status-red",
};

const deltaColors = {
    positive: "text-status-green",
    negative: "text-status-red",
    neutral: "text-slate-500 dark:text-slate-400",
};

export default function MetricCard({ data }: MetricCardProps) {
    return (
        <div className="rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-5 dark:bg-slate-800 dark:shadow-md">
            <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {data.title}
                </p>
                <span className={cn("mt-1 h-2.5 w-2.5 rounded-full", dotColors[data.status])} />
            </div>

            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100">
                    {data.value}
                </span>
                <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                    {data.unit}
                </span>
            </div>

            <p className={cn("mt-2 text-xs font-medium", deltaColors[data.deltaType])}>
                {data.delta}
            </p>
        </div>
    );
}
