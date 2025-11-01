import { LandPlot } from "@/types/land";
import { cn } from "@/lib/utils";

interface PlotProps {
  land: LandPlot;
  onClick: () => void;
}

export const Plot = ({ land, onClick }: PlotProps) => {
  const isOwned = land.owner !== null;
  const hasAssets = land.assets.length > 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-lg border transition-all duration-300",
        "hover:scale-105 hover:z-10 cursor-pointer",
        "flex items-center justify-center overflow-hidden",
        isOwned
          ? "border-primary bg-primary/5 hover:bg-primary/10 shadow-[0_0_15px_hsl(180_100%_50%/0.2)] hover:shadow-[0_0_25px_hsl(180_100%_50%/0.4)]"
          : "border-muted-foreground/20 bg-card/30 hover:bg-card/50 hover:border-muted-foreground/40"
      )}
      style={{
        backgroundImage: land.backgroundImage
          ? `url(${land.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Plot ID */}
      <div className="absolute top-1 left-1 text-[10px] font-mono text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
        #{land.id}
      </div>

      {/* Owned indicator */}
      {isOwned && (
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
      )}

      {/* Asset icons */}
      {hasAssets && (
        <div className="absolute bottom-1 left-1 right-1 flex gap-1 flex-wrap justify-center">
          {land.assets.slice(0, 3).map((asset, idx) => (
            <img
              key={idx}
              src={asset.image}
              alt={asset.name}
              className="w-6 h-6 rounded object-cover border border-primary/50"
            />
          ))}
          {land.assets.length > 3 && (
            <div className="w-6 h-6 rounded bg-primary/20 border border-primary/50 flex items-center justify-center text-[8px] font-bold text-primary">
              +{land.assets.length - 3}
            </div>
          )}
        </div>
      )}
    </button>
  );
};
