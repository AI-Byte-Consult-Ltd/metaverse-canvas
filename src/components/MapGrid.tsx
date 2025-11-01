import { LandPlot } from "@/types/land";
import { Plot } from "./Plot";

interface MapGridProps {
  lands: LandPlot[];
  onPlotClick: (land: LandPlot) => void;
}

export const MapGrid = ({ lands, onPlotClick }: MapGridProps) => {
  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-10 gap-1 sm:gap-2 md:gap-3 lg:gap-4 max-w-[1400px] mx-auto">
        {lands.map((land) => (
          <Plot key={land.id} land={land} onClick={() => onPlotClick(land)} />
        ))}
      </div>
    </div>
  );
};
