import React from 'react';

interface ProjectDetailsContentProps {
  project: {
    long_description?: string;
    skills?: Array<{
      id: string;
      name: string;
      rating: number;
    }>;
    hosting_platform?: string;
    cicd_pipeline?: string;
    monitoring_tracking?: string;
  };
}

export default function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  // All content has been moved to the main ProjectDetails component
  // This component is kept for future extensions
  return null;
} 