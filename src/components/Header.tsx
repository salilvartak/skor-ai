import { Button } from "@/components/ui/button";
import { Search, User, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container relative mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src="/assets/logo.png" alt="Logo" className="h-8" />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link to="/setting" className="group flex flex-col items-center gap-1">
            <Button variant="ghost" size="icon" className="text-white hover:text-black">
              <Settings className="h-5 w-5" />
            </Button>
            </Link>
            <Link to="/profile" className="group flex flex-col items-center gap-1">
            <Button variant="ghost" size="icon" className="text-white hover:text-black">
              <User className="h-5 w-5" />
            </Button>
            </Link>
            <Button className="bg-accent hover:bg-accent/90 text-primary-foreground">
              Connect Wallet
            </Button>
          </div>
        </div>

        {/* Absolutely Centered Search Bar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent w-5 h-5 z-20 pointer-events-none" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800/40 backdrop-blur-md text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition z-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
