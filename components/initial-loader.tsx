"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait until DOM and initial scripts are fully loaded
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-500">
          <div className="relative flex items-center justify-center">
            {/* Glowing ring animation */}
            <div className="absolute h-24 w-24 rounded-full bg-[hsl(var(--green))]/20 blur-2xl animate-pulse" />
            
            {/* Main spinner */}
            <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--green))]" />
          </div>

          <div className="mt-6 flex items-center gap-2 font-black text-sm uppercase tracking-widest text-foreground">
            <Sparkles className="h-4 w-4 text-[hsl(var(--green))]" />
            <span>Loading Minimart...</span>
          </div>
        </div>
      )}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}