
import { useState, useEffect } from "react";
import NumberLine from "@/components/NumberLine";
import Hopper from "@/components/Hopper";
import ControlPanel from "@/components/ControlPanel";
import ResultDisplay from "@/components/ResultDisplay";
import { generateProblem } from "@/utils/problemGenerator";

const Index = () => {
  const [problem, setProblem] = useState(generateProblem());
  const [positions, setPositions] = useState<[number, number]>([0, 0]);
  const [multiples, setMultiples] = useState<[number[], number[]]>([[], []]);
  const [lcd, setLcd] = useState<number | null>(null);
  
  // Calculate initial max value based on denominators
  const calculateMaxValue = (denom1: number, denom2: number) => {
    // Start with 3 times the larger denominator or at least 24
    return Math.max(3 * Math.max(denom1, denom2), 24);
  };
  
  const [maxValue, setMaxValue] = useState(
    calculateMaxValue(problem.denominators[0], problem.denominators[1])
  );

  // Move both hoppers to LCD when it's found
  useEffect(() => {
    if (lcd !== null) {
      setPositions([lcd, lcd]);
    }
  }, [lcd]);

  const handleHop = (hopperIndex: 0 | 1) => {
    if (lcd !== null) return; // Stop hopping if LCD is found

    const denominator = problem.denominators[hopperIndex];
    const newPosition = positions[hopperIndex] + denominator;
    
    // Update the position and multiples for this hopper
    const newPositions = [...positions] as [number, number];
    newPositions[hopperIndex] = newPosition;
    setPositions(newPositions);

    const newMultiples = [...multiples] as [number[], number[]];
    newMultiples[hopperIndex] = [...newMultiples[hopperIndex], newPosition];
    setMultiples(newMultiples);

    // Dynamically extend the number line if needed
    if (newPosition > maxValue - 6) {
      setMaxValue(maxValue + Math.max(denominator * 2, 12));
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

  const handleBack = (hopperIndex: 0 | 1) => {
    if (lcd !== null || positions[hopperIndex] === 0) return;

    const denominator = problem.denominators[hopperIndex];
    const newPosition = positions[hopperIndex] - denominator;
    
    if (newPosition < 0) return;
    
    // Update the position and multiples for this hopper
    const newPositions = [...positions] as [number, number];
    newPositions[hopperIndex] = newPosition;
    setPositions(newPositions);

    const newMultiples = [...multiples] as [number[], number[]];
    // Remove the last multiple if it exists
    if (newMultiples[hopperIndex].includes(positions[hopperIndex])) {
      newMultiples[hopperIndex] = newMultiples[hopperIndex].filter(
        m => m !== positions[hopperIndex]
      );
      setMultiples(newMultiples);
    }
  };

  const handleNewProblem = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);
    setPositions([0, 0]);
    setMultiples([[], []]);
    setLcd(null);
    setMaxValue(calculateMaxValue(newProblem.denominators[0], newProblem.denominators[1]));
  };

  // Calculate hopper position percentages based on maxValue
  const getHopperPositionPercent = (position: number) => {
    return (position / maxValue) * 100;
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
            onBack={handleBack}
            onNewProblem={handleNewProblem} 
            lcd={lcd}
            positions={positions}
          />

          <div className="mt-8 space-y-8">
            <div className="relative">
              <Hopper
                hopperIndex={0}
                position={getHopperPositionPercent(positions[0])}
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
                position={getHopperPositionPercent(positions[1])}
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
