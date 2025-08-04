import { cn } from "@/lib/utils";

interface StatsDisplayProps {
  label: string;
  value: string;
  className?: string;
  animated?: boolean;
}

export const StatsDisplay = ({ label, value, className, animated = false }: StatsDisplayProps) => {
  return (
    <div className={cn(
      "glass-card p-4 text-center",
      animated && "animate-float",
      className
    )}>
      <div className="text-2xl font-bold text-primary glow">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
};