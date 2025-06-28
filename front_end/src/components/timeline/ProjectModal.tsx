import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Building, ExternalLink, Github } from "lucide-react";
import { Project } from "@/types/data";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const { 
    title, 
    short_description, 
    project_type,
    github_url,
    live_url,
    duration,
    start_date,
    end_date,
    role,
    company,
    ml_models,
    skills,
    achievements,
    deployment,
    hosting_platform,
    cicd_pipeline,
    monitoring_tracking
  } = project;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between pr-8">
            <div>
              {title}
              <DialogDescription className="text-primary mt-1 text-base">
                {project_type} {company && `• ${company.name}`}
              </DialogDescription>
            </div>
            <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Duration */}
          {(start_date || duration) && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {start_date && end_date 
                  ? `${start_date} - ${end_date}`
                  : duration || start_date
                }
              </span>
            </div>
          )}
          
          {/* Company */}
          {company && (
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{company.name}, {company.location}</span>
            </div>
          )}
        </div>

        {/* Links */}
        {(github_url || live_url) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-sm"
              >
                <Github className="h-4 w-4 mr-2" />
                View Code
              </a>
            )}
            {live_url && (
              <a
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        )}
        
        {/* Description */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Description</h4>
          <p className="text-muted-foreground leading-relaxed">{short_description}</p>
        </div>

        {/* Role */}
        {role && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Role</h4>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {role}
            </Badge>
          </div>
        )}
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.id} className="bg-primary/20 text-primary border border-primary/40">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* ML Models */}
        {ml_models && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">Machine Learning Model</h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Model:</span>
                  <p className="text-muted-foreground">{ml_models.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Type:</span>
                  <p className="text-muted-foreground">{ml_models.model_type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Framework:</span>
                  <p className="text-muted-foreground">{ml_models.framework}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Accuracy:</span>
                  <p className="text-muted-foreground">{ml_models.accuracy}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3">Key Achievements</h4>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-muted/50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">{achievement.achievement_title}</h5>
                  <p className="text-muted-foreground text-sm mb-2">{achievement.achievement_description}</p>
                  {achievement.impact_metrics && (
                    <p className="text-xs text-primary font-medium">Impact: {achievement.impact_metrics}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deployment Info */}
        {(deployment || hosting_platform || cicd_pipeline || monitoring_tracking) && (
          <div>
            <h4 className="text-lg font-medium mb-3">Deployment & Infrastructure</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deployment && (
                <div>
                  <span className="text-sm font-medium">Deployment:</span>
                  <p className="text-muted-foreground">{deployment}</p>
                </div>
              )}
              {hosting_platform && (
                <div>
                  <span className="text-sm font-medium">Hosting:</span>
                  <p className="text-muted-foreground">{hosting_platform}</p>
                </div>
              )}
              {cicd_pipeline && (
                <div>
                  <span className="text-sm font-medium">CI/CD:</span>
                  <p className="text-muted-foreground">{cicd_pipeline}</p>
                </div>
              )}
              {monitoring_tracking && (
                <div>
                  <span className="text-sm font-medium">Monitoring:</span>
                  <p className="text-muted-foreground">{monitoring_tracking}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
