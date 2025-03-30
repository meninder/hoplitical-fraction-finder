import { HopperIndex } from '@/types';
import ControlPanel from '@/components/ControlPanel';
import ResultDisplay from '@/components/ResultDisplay';
import HopperContainer from '@/components/HopperContainer';
import { useHopperState } from '@/hooks/useHopperState';
import { UI } from '@/constants';

const Index = () => {
  const {
    problem,
    positions,
    multiples,
    lcd,
    maxValue,
    handleHop,
    handleBack,
    handleNewProblem,
    getHopperPositionPercent
  } = useHopperState();

  return (
    <div className={`min-h-screen bg-gradient-to-b ${UI.COLORS.BACKGROUND.FROM} ${UI.COLORS.BACKGROUND.TO} ${UI.SPACING.PADDING.MOBILE} ${UI.SPACING.PADDING.DESKTOP}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`${UI.TYPOGRAPHY.HEADING.MOBILE} ${UI.TYPOGRAPHY.HEADING.DESKTOP} font-bold text-center ${UI.SPACING.MARGIN.BOTTOM.SMALL} text-purple-800`}>
          Multiples Hopper
        </h1>
        <p className={`text-center ${UI.SPACING.MARGIN.BOTTOM.MEDIUM} text-gray-600`}>
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
            <HopperContainer
              hopperIndex={HopperIndex.First}
              position={getHopperPositionPercent(positions[0])}
              denominator={problem.denominators[0]}
              maxValue={maxValue}
              multiples={multiples[0]}
              lcd={lcd}
            />
            
            <HopperContainer
              hopperIndex={HopperIndex.Second}
              position={getHopperPositionPercent(positions[1])}
              denominator={problem.denominators[1]}
              maxValue={maxValue}
              multiples={multiples[1]}
              lcd={lcd}
            />
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
