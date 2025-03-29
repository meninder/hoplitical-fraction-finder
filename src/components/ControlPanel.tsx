
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";

interface ControlPanelProps {
  problem: {
    fractions: [string, string];
    denominators: [number, number];
  };
  onHop: (hopperIndex: 0 | 1) => void;
  onBack: (hopperIndex: 0 | 1) => void;
  onNewProblem: () => void;
  lcd: number | null;
  positions: [number, number];
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  problem, 
  onHop, 
  onBack,
  onNewProblem,
  lcd,
  positions
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col items-center space-y-4 p-4 bg-purple-50 rounded-lg">
        <div className="text-2xl font-bold text-purple-700">
          {problem.fractions[0]}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onBack(0)} 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={lcd !== null || positions[0] === 0}
          >
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
          <Button 
            onClick={() => onHop(0)} 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={lcd !== null}
          >
            Hop <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-700">
          {problem.fractions[1]}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => onBack(1)} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={lcd !== null || positions[1] === 0}
          >
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
          <Button 
            onClick={() => onHop(1)} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={lcd !== null}
          >
            Hop <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      <div className="md:col-span-2 flex justify-center mt-4">
        <Button 
          onClick={onNewProblem}
          variant="outline" 
          className="border-gray-300"
        >
          <RefreshCw className="mr-2" size={16} />
          New Problem
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
