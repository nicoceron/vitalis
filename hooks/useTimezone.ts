import { useEffect, useState } from "react";
import { getUserTimezone } from "@/lib/date-utils";

/**
 * Hook to detect and manage user's timezone
 */
export function useTimezone() {
  const [timezone, setTimezone] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const detectedTimezone = getUserTimezone();
      setTimezone(detectedTimezone);

      // Store in localStorage for persistence
      localStorage.setItem("userTimezone", detectedTimezone);
    } catch (error) {
      console.error("Error detecting timezone:", error);
      // Try to get from localStorage as fallback
      const storedTimezone = localStorage.getItem("userTimezone");
      setTimezone(storedTimezone || "America/Bogota");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    timezone,
    isLoading,
    setTimezone,
  };
}
