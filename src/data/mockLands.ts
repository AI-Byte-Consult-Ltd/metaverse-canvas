import { LandPlot } from "@/types/land";
import houseIcon from "@/assets/house-icon.png";
import carIcon from "@/assets/car-icon.png";
import resourceIcon from "@/assets/resource-icon.png";

export const mockLands: LandPlot[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const hasOwner = Math.random() > 0.7; // 30% owned
  
  if (!hasOwner) {
    return {
      id,
      owner: null,
      assets: [],
    };
  }

  const mockOwner = `0x${Math.random().toString(16).slice(2, 42)}`;
  const assets = [];

  // Random assets for owned lands
  if (Math.random() > 0.5) {
    assets.push({
      type: "house" as const,
      name: "Cyber Villa",
      image: houseIcon,
    });
  }
  if (Math.random() > 0.6) {
    assets.push({
      type: "car" as const,
      name: "Neon Racer",
      image: carIcon,
    });
  }
  if (Math.random() > 0.4) {
    assets.push({
      type: "resource" as const,
      name: "Crystal Tokens",
      image: resourceIcon,
      amount: Math.floor(Math.random() * 1000) + 100,
    });
  }

  return {
    id,
    owner: mockOwner,
    assets,
  };
});
