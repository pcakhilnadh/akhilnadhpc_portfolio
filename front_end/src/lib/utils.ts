import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date function - Takes a date string like "2023-01" or "2011" and returns a formatted date
export function formatDate(dateStr: string): string {
  // If the date string is "Present"
  if (dateStr === "Present") return "Present";
  
  // If the date is just a year (e.g. "2011")
  if (/^\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  
  // If the date is in format "YYYY-MM"
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
  }
  
  // If it's a full date string
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    }
  } catch (e) {
    // Date parsing failed, will return original string
  }
  
  // Return the original string if no formatting applied
  return dateStr;
}

// Helper function to get month name
function getMonthName(monthIndex: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthIndex];
}

// Function to get icon name for social platforms
export function getSocialIcon(platform: string): string {
  const icons: Record<string, string> = {
    linkedin: "linkedin",
    github: "github",
    twitter: "twitter",
    instagram: "instagram",
    medium: "medium",
    leetcode: "code",
    hackerrank: "code-2",
    stackoverflow: "stack",
    kaggle: "bar-chart",
    personal_blog: "globe",
    email: "mail",
    "Google Map Reviewer Profile": "map-pin"
  };
  
  return icons[platform.toLowerCase()] || "link";
} 