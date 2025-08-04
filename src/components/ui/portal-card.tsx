import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PortalCardProps {
  title: string;
  description: string;
  backgroundImage: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const PortalCard = ({ 
  title, 
  description, 
  backgroundImage, 
  children, 
  className,
  onClick 
}: PortalCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card portal-frame tilt-card glow-on-hover group cursor-pointer relative h-80 overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </div>
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
    </div>
  );
};