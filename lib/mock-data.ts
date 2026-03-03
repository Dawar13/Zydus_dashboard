// ─── Shared Types ───────────────────────────────────────────────────
export interface MetricData {
    title: string;
    value: string;
    unit: string;
    delta: string;
    deltaType: "positive" | "negative" | "neutral";
    status: "green" | "yellow" | "red";
}

export interface TimeSeriesPoint {
    time: string;
    value: number;
}

// ─── Data Generators ────────────────────────────────────────────────
function generateTimeSeries(
    points: number,
    baseValue: number,
    variance: number,
    intervalMinutes: number
): TimeSeriesPoint[] {
    const now = new Date();
    return Array.from({ length: points }, (_, i) => {
        const t = new Date(now.getTime() - (points - i - 1) * intervalMinutes * 60000);
        const hours = t.getHours().toString().padStart(2, "0");
        const mins = t.getMinutes().toString().padStart(2, "0");
        return {
            time: intervalMinutes >= 60 ? `${hours}:00` : `${hours}:${mins}`,
            value: parseFloat((baseValue + (Math.random() - 0.5) * variance).toFixed(2)),
        };
    });
}

// ─── Pump Data Storage ──────────────────────────────────────────────
export const pumpData: Record<string, any> = {
    "VP-2401": {
        healthIndex: 87,
        metrics: {
            vacuumCurrent: 0.42,
            vacuumSetpoint: 0.50,
            powerLoad: 12.8,
            oilLevel: 78,
            runningHours: 4218,
            timeToSetpoint: 14.2,
        },
        charts: {
            vacuum: {
                "1h": generateTimeSeries(12, 0.45, 0.1, 5),
                "6h": generateTimeSeries(36, 0.45, 0.12, 10),
                "24h": generateTimeSeries(96, 0.45, 0.15, 15),
            },
            power: {
                "1h": generateTimeSeries(12, 12.5, 2.0, 5),
                "6h": generateTimeSeries(36, 12.5, 2.5, 10),
                "24h": generateTimeSeries(96, 12.5, 3.0, 15),
            },
        },
    },
    "VP-2402": {
        healthIndex: 72,
        metrics: {
            vacuumCurrent: 0.48,
            vacuumSetpoint: 0.50,
            powerLoad: 14.1,
            oilLevel: 65,
            runningHours: 8540,
            timeToSetpoint: 18.5,
        },
        charts: {
            vacuum: {
                "1h": generateTimeSeries(12, 0.48, 0.1, 5),
                "6h": generateTimeSeries(36, 0.48, 0.12, 10),
                "24h": generateTimeSeries(96, 0.48, 0.15, 15),
            },
            power: {
                "1h": generateTimeSeries(12, 14.1, 2.0, 5),
                "6h": generateTimeSeries(36, 14.1, 2.5, 10),
                "24h": generateTimeSeries(96, 14.1, 3.0, 15),
            },
        },
    },
    "VP-2403": {
        healthIndex: 58,
        metrics: {
            vacuumCurrent: 0.65,
            vacuumSetpoint: 0.50,
            powerLoad: 16.5,
            oilLevel: 42,
            runningHours: 12400,
            timeToSetpoint: 28.4,
        },
        charts: {
            vacuum: {
                "1h": generateTimeSeries(12, 0.65, 0.15, 5),
                "6h": generateTimeSeries(36, 0.65, 0.2, 10),
                "24h": generateTimeSeries(96, 0.65, 0.25, 15),
            },
            power: {
                "1h": generateTimeSeries(12, 16.5, 3.0, 5),
                "6h": generateTimeSeries(36, 16.5, 3.5, 10),
                "24h": generateTimeSeries(96, 16.5, 4.0, 15),
            },
        },
    },
};

// ─── Alerts Data ────────────────────────────────────────────────────
export interface AlertItem {
    id: string;
    message: string;
    severity: "warning" | "critical";
    timestamp: string;
}

export const alertsData: AlertItem[] = [
    {
        id: "a1",
        message: "Vacuum not reaching setpoint — deviation exceeds 15%",
        severity: "critical",
        timestamp: "12:42 PM",
    },
    {
        id: "a2",
        message: "Oil level low — scheduled maintenance recommended",
        severity: "warning",
        timestamp: "11:18 AM",
    },
    {
        id: "a3",
        message: "Power load increased — 0.5 kW above normal operating range",
        severity: "warning",
        timestamp: "10:05 AM",
    },
];
