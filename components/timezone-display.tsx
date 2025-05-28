import { useTimezone } from "@/hooks/useTimezone";
import { Clock } from "lucide-react";

interface TimezoneDisplayProps {
  className?: string;
  showIcon?: boolean;
}

export function TimezoneDisplay({
  className = "",
  showIcon = true,
}: TimezoneDisplayProps) {
  const { timezone, isLoading } = useTimezone();

  if (isLoading) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Detecting timezone...
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 text-sm text-gray-500 ${className}`}
    >
      {showIcon && <Clock className="h-3 w-3" />}
      <span>Times shown in your timezone: {timezone.replace("_", " ")}</span>
    </div>
  );
}
