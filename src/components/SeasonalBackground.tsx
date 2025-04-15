
import React, { useEffect, useState } from "react";

type Season = "spring" | "summer" | "autumn" | "winter";

const SeasonalBackground = () => {
  const [currentSeason, setCurrentSeason] = useState<Season>("spring");

  useEffect(() => {
    // Change season every 10 seconds
    const interval = setInterval(() => {
      setCurrentSeason((prev) => {
        switch (prev) {
          case "spring":
            return "summer";
          case "summer":
            return "autumn";
          case "autumn":
            return "winter";
          case "winter":
            return "spring";
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const seasonStyles = {
    spring: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100",
    summer: "bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100",
    autumn: "bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100",
    winter: "bg-gradient-to-br from-blue-100 via-slate-100 to-purple-100",
  };

  return (
    <div
      className={`fixed inset-0 transition-colors duration-[3000ms] ease-in-out -z-10 ${seasonStyles[currentSeason]}`}
      aria-hidden="true"
    />
  );
};

export default SeasonalBackground;
