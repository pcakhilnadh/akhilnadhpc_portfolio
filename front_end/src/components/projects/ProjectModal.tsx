import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, MapPin, Users, Zap, Globe, GitBranch, Activity, Terminal } from 'lucide-react';
import { Project } from '@/types/data';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden bg-black/95 border border-green-500/40 backdrop-blur-sm p-0 rounded-lg">
            {/* Hacker-themed Header */}
            <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 border-b border-green-500/40 p-3 rounded-t-lg">
              <div className="flex items-center justify-between">
                {/* Window Control Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors duration-200"
                  />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-50" />
                  <div className="w-3 h-3 bg-green-500 rounded-full opacity-50" />
                </div>
                
                {/* Project Title */}
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-mono font-bold text-sm">{project.title}</span>
                </div>
                
                {/* External Link Icon */}
                <div className="flex items-center space-x-2">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-green-500/20 border border-green-500/40 rounded hover:bg-green-500/30 hover:border-green-400 transition-all duration-300"
                    >
                      <ExternalLink className="h-3 w-3 text-green-400" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
                    >
                      <Github className="h-3 w-3 text-cyan-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-60px)] p-6">
              <div className="space-y-4">
                {/* Project Description */}
                <div className="bg-black/60 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <h3 className="text-green-300 font-mono font-bold">DESCRIPTION</h3>
                  </div>
                  <div className="ml-4">
                    <p className="text-muted-foreground leading-relaxed font-mono text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Company & Role */}
                  <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <h3 className="text-cyan-300 font-mono font-bold flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        COMPANY_INFO
                      </h3>
                    </div>
                    <div className="ml-4 space-y-2">
                      {project.company && (
                        <>
                          <div className="flex items-center text-sm">
                            <span className="text-cyan-400 font-mono">company_name:</span>
                            <span className="ml-2 text-muted-foreground font-mono">"{project.company.name}"</span>
                          </div>
                          {project.company.location && (
                            <div className="flex items-center text-sm">
                              <span className="text-cyan-400 font-mono">location:</span>
                              <span className="ml-2 text-muted-foreground font-mono">"{project.company.location}"</span>
                            </div>
                          )}
                        </>
                      )}
                      {project.role && (
                        <div className="flex items-center text-sm">
                          <span className="text-cyan-400 font-mono">role:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.role}"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Duration & Timeline */}
                  <div className="bg-black/60 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <h3 className="text-yellow-300 font-mono font-bold flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        TIMELINE
                      </h3>
                    </div>
                    <div className="ml-4 space-y-2">
                      {project.duration && (
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-400 font-mono">duration:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.duration}"</span>
                        </div>
                      )}
                      {project.start_date && (
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-400 font-mono">start_date:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.start_date}"</span>
                        </div>
                      )}
                      {project.end_date && (
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-400 font-mono">end_date:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.end_date}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                {project.skills && project.skills.length > 0 && (
                  <div className="bg-black/60 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <h3 className="text-purple-300 font-mono font-bold flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        TECH_STACK
                      </h3>
                    </div>
                    <div className="ml-4">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <Badge
                            key={skill.id}
                            className="bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 font-mono text-xs px-2 py-1"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                {(project.deployment || project.hosting_platform || project.cicd_pipeline) && (
                  <div className="bg-black/60 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <h3 className="text-blue-300 font-mono font-bold flex items-center">
                        <Activity className="h-4 w-4 mr-2" />
                        DEPLOYMENT
                      </h3>
                    </div>
                    <div className="ml-4 grid md:grid-cols-2 gap-4">
                      {project.deployment && (
                        <div className="flex items-center text-sm">
                          <span className="text-blue-400 font-mono">status:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.deployment}"</span>
                        </div>
                      )}
                      {project.hosting_platform && (
                        <div className="flex items-center text-sm">
                          <span className="text-blue-400 font-mono">platform:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.hosting_platform}"</span>
                        </div>
                      )}
                      {project.cicd_pipeline && (
                        <div className="flex items-center text-sm">
                          <span className="text-blue-400 font-mono">ci_cd:</span>
                          <span className="ml-2 text-muted-foreground font-mono">"{project.cicd_pipeline}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {project.achievements && project.achievements.length > 0 && (
                  <div className="bg-black/60 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <h3 className="text-orange-300 font-mono font-bold">ACHIEVEMENTS</h3>
                    </div>
                    <div className="ml-4 space-y-3">
                      {project.achievements.map((achievement) => (
                        <div key={achievement.id} className="border-l-2 border-orange-500/40 pl-3">
                          <h4 className="text-orange-400 font-mono font-bold text-sm">{achievement.achievement_title}</h4>
                          <p className="text-muted-foreground font-mono text-xs mt-1">{achievement.achievement_description}</p>
                          {achievement.impact_metrics && (
                            <p className="text-orange-300 font-mono text-xs mt-1">impact: "{achievement.impact_metrics}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 