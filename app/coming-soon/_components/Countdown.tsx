"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  // Target date: September 1st
  const targetDate = new Date("2026-09-01T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-xs"
        >
          <span className="text-2xl sm:text-4xl font-black text-foreground font-mono">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}