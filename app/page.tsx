"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import MetricCard from "@/components/cards/metric-card";
import HealthCard from "@/components/cards/health-card";
import VacuumChart from "@/components/charts/vacuum-chart";
import PowerChart from "@/components/charts/power-chart";
import AlertsPanel from "@/components/alerts/alerts-panel";
import ChatbotFab from "@/components/chatbot/chatbot-fab";
import { pumpData, alertsData, type MetricData } from "@/lib/mock-data";

export default function DashboardPage() {
  const [selectedPump, setSelectedPump] = useState("VP-2401");

  const pump = pumpData[selectedPump];
  const { metrics, healthIndex, charts } = pump;

  // Dynamically build metrics array derived from the selected pump's metrics
  const displayMetrics: MetricData[] = [
    {
      title: "Current Vacuum",
      value: metrics.vacuumCurrent.toString(),
      unit: "mbar",
      delta:
        metrics.vacuumCurrent > metrics.vacuumSetpoint
          ? "+5% from setpoint"
          : "On target",
      deltaType:
        metrics.vacuumCurrent > metrics.vacuumSetpoint ? "negative" : "positive",
      status:
        metrics.vacuumCurrent > metrics.vacuumSetpoint ? "yellow" : "green",
    },
    {
      title: "Setpoint Vacuum",
      value: metrics.vacuumSetpoint.toString(),
      unit: "mbar",
      delta: "Target maintained",
      deltaType: "neutral",
      status: "green",
    },
    {
      title: "Power Load",
      value: metrics.powerLoad.toString(),
      unit: "kW",
      delta:
        metrics.powerLoad > 14 ? "+1.5 kW from avg" : "-0.2 kW from avg",
      deltaType: metrics.powerLoad > 14 ? "negative" : "positive",
      status: metrics.powerLoad > 14 ? "yellow" : "green",
    },
    {
      title: "Oil Level",
      value: metrics.oilLevel.toString(),
      unit: "%",
      delta: metrics.oilLevel < 50 ? "Needs refill soon" : "-2% this week",
      deltaType: metrics.oilLevel < 50 ? "negative" : "neutral",
      status: metrics.oilLevel < 50 ? "yellow" : "green",
    },
    {
      title: "Running Hours",
      value: metrics.runningHours.toLocaleString(),
      unit: "hrs",
      delta: "+24 hrs today",
      deltaType: "neutral",
      status: "green",
    },
    {
      title: "Time to Setpoint",
      value: metrics.timeToSetpoint.toString(),
      unit: "s",
      delta:
        metrics.timeToSetpoint > 20
          ? "+2.5s slower"
          : "-1.1s improvement",
      deltaType: metrics.timeToSetpoint > 20 ? "negative" : "positive",
      status: metrics.timeToSetpoint > 20 ? "yellow" : "green",
    },
  ];

  return (
    <DashboardShell
      selectedPump={selectedPump}
      onPumpChange={setSelectedPump}
      healthIndex={healthIndex}
    >
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Row 1: Health Card + First 2 Metric Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          <HealthCard value={healthIndex} />
          {displayMetrics.slice(0, 2).map((m) => (
            <MetricCard key={m.title} data={m} />
          ))}
        </div>

        {/* Row 2: Remaining 4 Metric Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {displayMetrics.slice(2).map((m) => (
            <MetricCard key={m.title} data={m} />
          ))}
        </div>

        {/* Row 3: Charts */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <VacuumChart data={charts.vacuum} />
          <PowerChart data={charts.power} />
        </div>

        {/* Row 4: Alerts Panel */}
        <AlertsPanel alerts={alertsData} />
      </div>

      {/* Chatbot FAB */}
      <ChatbotFab />
    </DashboardShell>
  );
}
