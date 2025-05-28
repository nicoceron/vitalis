// Date utilities for timezone-aware date handling

/**
 * Get the current date in the user's timezone in YYYY-MM-DD format
 * Falls back to Bogotá timezone if no timezone is provided
 */
export function getCurrentDate(timezone?: string): string {
  const userTimezone =
    timezone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone ||
    "America/Bogota";
  return new Date().toLocaleDateString("en-CA", {
    timeZone: userTimezone,
  });
}

/**
 * Get the current date in Bogotá, Colombia timezone in YYYY-MM-DD format
 * @deprecated Use getCurrentDate() instead for better timezone support
 */
export function getBogotaDate(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Bogota",
  });
}

/**
 * Get the user's current timezone
 */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn(
      "Could not detect user timezone, falling back to America/Bogota"
    );
    return "America/Bogota";
  }
}

/**
 * Add months to a date string and return in YYYY-MM-DD format
 * Handles date-only strings (YYYY-MM-DD) without timezone conversion
 */
export function addMonthsToDate(dateString: string, months: number): string {
  if (!dateString) return "";

  // Parse the date components manually to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed

  // Add the specified number of months
  date.setMonth(date.getMonth() + months);

  // Return in YYYY-MM-DD format
  return date.toLocaleDateString("en-CA");
}

/**
 * Format a date string for display in a user-friendly format
 * Handles date-only strings (YYYY-MM-DD) without timezone conversion
 */
export function formatDisplayDate(dateString: string): string {
  if (!dateString) return "N/A";

  // Handle date-only strings (YYYY-MM-DD) without timezone conversion
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // For datetime strings, use the original approach
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
