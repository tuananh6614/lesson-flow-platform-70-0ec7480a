
import React, { useState } from "react";
import { Sun, Flower, Leaf, Snowflake } from "lucide-react";
import { Button } from "./ui/button";

type Season = "spring" | "summer" | "autumn" | "winter";

const SeasonalBackground = () => {
  const [currentSeason, setCurrentSeason] = useState<Season>("spring");

  const seasonStyles = {
    spring: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100",
    summer: "bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100",
    autumn: "bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100",
    winter: "bg-gradient-to-br from-blue-100 via-slate-100 to-purple-100",
  };

  const seasonButtons = [
    { season: "spring" as Season, icon: Flower, label: "Xuân" },
    { season: "summer" as Season, icon: Sun, label: "Hạ" },
    { season: "autumn" as Season, icon: Leaf, label: "Thu" },
    { season: "winter" as Season, icon: Snowflake, label: "Đông" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 transition-colors duration-[3000ms] ease-in-out -z-10 ${seasonStyles[currentSeason]}`}
        aria-hidden="true"
      />
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {seasonButtons.map(({ season, icon: Icon, label }) => (
          <Button
            key={season}
            variant={currentSeason === season ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentSeason(season)}
            className="w-12 h-12 rounded-full bg-white/80 hover:bg-white/90 transition-all duration-200"
            title={label}
          >
            <Icon className="h-6 w-6" />
          </Button>
        ))}
      </div>
    </>
  );
};

export default SeasonalBackground;

