import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "Healthy" | "Warning" | "Critical";
}

const statusConfig = {
    Healthy: {
        color: "bg-status-green",
        text: "text-status-green",
        label: "Healthy",
    },
    Warning: {
        color: "bg-status-yellow",
        text: "text-yellow-600 dark:text-status-yellow",
        label: "Warning",
    },
    Critical: {
        color: "bg-status-red",
        text: "text-status-red",
        label: "Critical",
    },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <div className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", config.color)}>
                <span
                    className={cn(
                        "block h-2.5 w-2.5 animate-ping rounded-full opacity-40",
                        config.color
                    )}
                />
            </span>
            <span
                className={cn("text-xs font-medium", config.text)}
            >
                {config.label}
            </span>
        </div>
    );
}
