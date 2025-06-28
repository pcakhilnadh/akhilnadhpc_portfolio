import { 
  Brain, 
  Code, 
  Database, 
  Cloud, 
  Users, 
  Zap,
  FileText,
  Car,
  FileSearch,
  PenTool,
  Globe,
  Lightbulb,
  Bot,
  MessageSquare
} from 'lucide-react';

export const iconMapping: { [key: string]: any } = {
  Brain,
  Code,
  Database,
  Cloud,
  Users,
  Zap,
  FileText,
  Car,
  FileSearch,
  PenTool,
  Globe,
  Lightbulb,
  Bot,
  MessageSquare
};

export function getIconComponent(iconName: string) {
  return iconMapping[iconName] || Code; // Default to Code icon if not found
} 