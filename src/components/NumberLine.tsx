
import React from "react";
import { cn } from "@/lib/utils";

interface NumberLineProps {
  maxValue: number;
  multiples: number[];
  color: "purple" | "blue";
  lcd: number | null;
}

const NumberLine: React.FC<NumberLineProps> = ({ 
  maxValue, 
  multiples, 
  color,
  lcd
}) => {
  const colorClasses = {
    purple: {
      line: "bg-purple-200",
      marker: "bg-purple-500",
      highlight: "bg-purple-300",
      text: "text-purple-700"
    },
    blue: {
      line: "bg-blue-200",
      marker: "bg-blue-500", 
      highlight: "bg-blue-300",
      text: "text-blue-700"
    }
  };

  // Create tick marks for the number line
  const tickMarks = [];
  for (let i = 0; i <= maxValue; i += 4) {
    const isMultiple = multiples.includes(i);
    const isLcd = lcd === i;
    
    tickMarks.push(
      <div 
        key={i} 
        className="flex flex-col items-center"
        style={{ position: 'absolute', left: `${(i / maxValue) * 100}%` }}
      >
        <div className="h-4 w-0.5 bg-gray-300"></div>
        <span className="text-xs text-gray-500 mt-1">{i}</span>
        
        {isMultiple && (
          <div 
            className={cn(
              "w-4 h-4 rounded-full absolute -top-5", 
              colorClasses[color].marker,
              isLcd && "animate-pulse w-5 h-5 border-2 border-yellow-400"
            )}
          ></div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 pt-8 relative">
      <div className={`h-2 rounded-full w-full ${colorClasses[color].line} relative`}>
        {tickMarks}
      </div>
    </div>
  );
};

export default NumberLine;
