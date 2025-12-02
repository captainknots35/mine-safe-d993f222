export interface AIPersona {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string;
  system_prompt: string;
  specialty: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content_html: string;
  excerpt: string;
  featured_image_url: string | null;
  author_persona_id: string | null;
  seo_keywords: string[];
  category: string;
  status: 'draft' | 'review' | 'scheduled' | 'published';
  published_at: string | null;
  view_count: number;
  reading_time_minutes: number;
  created_at: string;
  updated_at: string;
  // Joined data
  author?: AIPersona;
}

export interface KeywordBank {
  id: string;
  keyword: string;
  cluster: 'compliance' | 'hazard' | 'news';
  search_volume: number;
  difficulty_score: number;
  is_used: boolean;
  last_used_at: string | null;
  created_at: string;
}

export type BlogCategory = 'Part 46' | 'Part 48' | 'Safety Alerts' | 'Equipment' | 'News';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Part 46',
  'Part 48', 
  'Safety Alerts',
  'Equipment',
  'News'
];
