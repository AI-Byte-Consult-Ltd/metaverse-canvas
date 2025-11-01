import { createConfig, http } from 'wagmi';
import { mainnet, polygon, cronos } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, cronos],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [cronos.id]: http(),
  },
});
