import { LandPlot } from "@/types/land";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Home, Car, Package, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandModalProps {
  land: LandPlot | null;
  isOpen: boolean;
  onClose: () => void;
}

const getAssetIcon = (type: string) => {
  switch (type) {
    case "house":
      return <Home className="w-5 h-5" />;
    case "car":
      return <Car className="w-5 h-5" />;
    case "furniture":
      return <Package className="w-5 h-5" />;
    case "resource":
      return <Gem className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

export const LandModal = ({ land, isOpen, onClose }: LandModalProps) => {
  if (!land) return null;

  const isOwned = land.owner !== null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 border-primary/30 backdrop-blur-xl shadow-[0_0_40px_hsl(180_100%_50%/0.2)] max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            Land Plot #{land.id}
            {isOwned && (
              <span className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
            )}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isOwned ? "Owned Property" : "Available for Purchase"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Owner Info */}
          <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              Owner
            </h3>
            {isOwned ? (
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-foreground bg-muted/50 px-3 py-1 rounded">
                  {land.owner}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() =>
                    window.open(
                      `https://etherscan.io/address/${land.owner}`,
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            ) : (
              <p className="text-foreground">Not yet claimed</p>
            )}
          </div>

          {/* Assets */}
          {land.assets.length > 0 ? (
            <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Assets ({land.assets.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {land.assets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-primary/30 flex-shrink-0">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {getAssetIcon(asset.type)}
                        <p className="font-semibold text-foreground truncate">
                          {asset.name}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">
                        {asset.type}
                        {asset.amount && ` • ${asset.amount.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-lg bg-background/50 border border-dashed border-muted-foreground/30 text-center">
              <p className="text-muted-foreground">
                {isOwned
                  ? "No assets on this land yet"
                  : "This land is available for claiming"}
              </p>
            </div>
          )}

          {/* Actions */}
          {!isOwned && (
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)] transition-all duration-300">
              Claim Land Plot
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
