
import { useState, useEffect } from "react";
import NumberLine from "@/components/NumberLine";
import Hopper from "@/components/Hopper";
import ControlPanel from "@/components/ControlPanel";
import ResultDisplay from "@/components/ResultDisplay";
import { generateProblem } from "@/utils/problemGenerator";

const Index = () => {
  const [problem, setProblem] = useState(generateProblem());
  const [positions, setPositions] = useState([0, 0]);
  const [multiples, setMultiples] = useState<[number[], number[]]>([[], []]);
  const [lcd, setLcd] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState(24);

  const handleHop = (hopperIndex: 0 | 1) => {
    if (lcd !== null) return; // Stop hopping if LCD is found

    const denominator = problem.denominators[hopperIndex];
    const newPosition = positions[hopperIndex] + denominator;
    
    // Update the position and multiples for this hopper
    const newPositions = [...positions];
    newPositions[hopperIndex] = newPosition;
    setPositions(newPositions);

    const newMultiples = [...multiples] as [number[], number[]];
    newMultiples[hopperIndex] = [...newMultiples[hopperIndex], newPosition];
    setMultiples(newMultiples);

    // Dynamically extend the number line if needed
    if (newPosition > maxValue - 6) {
      setMaxValue(maxValue + 12);
    }
    
    // Check if we found the LCD (common multiple)
    if (newMultiples[0].includes(newPosition) && newMultiples[1].includes(newPosition)) {
      setLcd(newPosition);
    } else if (hopperIndex === 0 && newMultiples[1].includes(newPosition)) {
      setLcd(newPosition);
    } else if (hopperIndex === 1 && newMultiples[0].includes(newPosition)) {
      setLcd(newPosition);
    }
  };

  const handleNewProblem = () => {
    setProblem(generateProblem());
    setPositions([0, 0]);
    setMultiples([[], []]);
    setLcd(null);
    setMaxValue(24);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-purple-800">
          Multiples Hopper
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Find the Least Common Denominator by hopping along the number lines!
        </p>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <ControlPanel 
            problem={problem} 
            onHop={handleHop} 
            onNewProblem={handleNewProblem} 
            lcd={lcd} 
          />

          <div className="mt-8 space-y-8">
            <div className="relative">
              <Hopper
                hopperIndex={0}
                position={positions[0]}
                color="purple"
                denominator={problem.denominators[0]}
              />
              <NumberLine 
                maxValue={maxValue} 
                multiples={multiples[0]} 
                color="purple" 
                lcd={lcd}
              />
            </div>
            
            <div className="relative">
              <Hopper
                hopperIndex={1}
                position={positions[1]}
                color="blue"
                denominator={problem.denominators[1]}
              />
              <NumberLine 
                maxValue={maxValue} 
                multiples={multiples[1]} 
                color="blue" 
                lcd={lcd}
              />
            </div>
          </div>
        </div>

        {lcd !== null && (
          <ResultDisplay lcd={lcd} onNewProblem={handleNewProblem} />
        )}
      </div>
    </div>
  );
};

export default Index;
