/**
 * Shared data types used by the data modules.
 */

export type BlogTag = 'Tech' | 'Personal' | 'InterviewEx';

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  author: string;
  content: string; // HTML content
  excerpt?: string;
  tags: BlogTag[];
  created_date: string;
  updated_date?: string;
  featured_image?: string;
  read_time?: number; // in minutes
}
