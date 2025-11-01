import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/config/wagmi";
import { WalletButton } from "@/components/WalletButton";
import { MapGrid } from "@/components/MapGrid";
import { LandModal } from "@/components/LandModal";
import { mockLands } from "@/data/mockLands";
import { LandPlot } from "@/types/land";
import metaverseBg from "@/assets/metaverse-bg.jpg";

const queryClient = new QueryClient();

const Index = () => {
  const [selectedLand, setSelectedLand] = useState<LandPlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlotClick = (land: LandPlot) => {
    setSelectedLand(land);
    setIsModalOpen(true);
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div
          className="min-h-screen w-full bg-background relative overflow-hidden"
          style={{
            backgroundImage: `url(${metaverseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-glow bg-grid opacity-30" />

          {/* Content */}
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-4 md:p-6 border-b border-primary/20 bg-card/30 backdrop-blur-md">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Metaverse Land
                  </span>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  100 Digital Land Plots • Web3 Powered
                </p>
              </div>
              <WalletButton />
            </header>

            {/* Map Grid */}
            <main className="flex-1 flex items-center justify-center overflow-auto">
              <MapGrid lands={mockLands} onPlotClick={handlePlotClick} />
            </main>

            {/* Footer Stats */}
            <footer className="flex flex-wrap items-center justify-center gap-4 md:gap-8 p-4 border-t border-primary/20 bg-card/30 backdrop-blur-md">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Plots</p>
                <p className="text-xl font-bold text-foreground">100</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Owned</p>
                <p className="text-xl font-bold text-primary">
                  {mockLands.filter((l) => l.owner).length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-bold text-secondary">
                  {mockLands.filter((l) => !l.owner).length}
                </p>
              </div>
            </footer>
          </div>

          {/* Land Detail Modal */}
          <LandModal
            land={selectedLand}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Index;
