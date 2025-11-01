export type AssetType = "house" | "car" | "furniture" | "resource";

export interface Asset {
  type: AssetType;
  name: string;
  image: string;
  amount?: number;
}

export interface LandPlot {
  id: number;
  owner: string | null;
  assets: Asset[];
  backgroundImage?: string;
}
