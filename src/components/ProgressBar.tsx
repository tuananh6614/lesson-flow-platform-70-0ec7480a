
import React from "react";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-bar-inner" 
        style={{ width: `${safeProgress}%` }}
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
