import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

export const WalletButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-primary/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
          <span className="text-sm font-mono text-foreground">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="icon"
          className="border-destructive/50 hover:border-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(180_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)] transition-all duration-300"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
};
