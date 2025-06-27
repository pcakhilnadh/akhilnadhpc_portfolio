import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Experience, Education } from '@/types/data';
import { Briefcase, Calendar, MapPin, ExternalLink, GraduationCap, Star, Building, Zap } from 'lucide-react';

type TimelineItemType = (Experience & { type: 'experience' }) | (Education & { type: 'education' });

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  // Alternate between left and right based on index (only on large desktop)
  const isLeft = index % 2 === 0;
  const isEducation = item.type === 'education';
  const Icon = isEducation ? GraduationCap : Briefcase;
  
  return (
    <motion.div 
      className="relative flex items-start justify-center min-h-[200px] lg:min-h-[250px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.17, 0.67, 0.83, 0.67]
      }}
    >
      {/* Cyberpunk Timeline Dot - Mobile/Tablet: left side, Large Desktop: center */}
      <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-8 lg:top-12 z-20">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1 + 0.3, 
            type: "spring", 
            stiffness: 400,
            duration: 0.8
          }}
          className="relative w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 shadow-2xl flex items-center justify-center bg-primary border-primary/80"
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)'
          }}
        >
          <Icon className="h-3 w-3 lg:h-4 lg:w-4 text-primary-foreground" />
          {/* Pulsing Ring */}
          <div 
            className="absolute inset-0 rounded-full animate-ping bg-primary" 
            style={{ animationDuration: '2s' }}
          />
        </motion.div>
      </div>

      {/* Cyberpunk Content Card - Mobile/Tablet: full width with left margin, Large Desktop: alternating */}
      <div className={`w-full lg:max-w-xl ${isLeft ? 'lg:mr-auto lg:pr-8 xl:pr-16' : 'lg:ml-auto lg:pl-8 xl:pl-16'} ml-16 lg:ml-0`}>
        <motion.div
          whileHover={{ 
            scale: 1.02, 
            y: -5,
            rotateY: isLeft ? 2 : -2
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Card className="relative overflow-hidden border-0 bg-card backdrop-blur-md shadow-2xl">
            {/* Neon Border Effect */}
            <div 
              className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-primary via-primary/80 to-primary"
              style={{
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 3s ease infinite'
              }}
            >
              <div className="h-full w-full rounded-lg bg-card" />
            </div>

            {/* Cyberpunk Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="w-full h-1 bg-primary" />
              <div className="w-1 h-full bg-primary" />
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="w-full h-1 bg-primary" />
              <div className="w-1 h-full ml-auto bg-primary" />
            </div>

            {/* Glowing Arrow - Hidden on mobile/tablet, visible only on large desktop */}
            <div className={`hidden lg:block absolute top-8 lg:top-12 w-0 h-0 z-10 ${
              isLeft 
                ? 'right-[-12px] border-l-[12px] border-l-card border-y-transparent border-y-[8px] border-r-0' 
                : 'left-[-12px] border-r-[12px] border-r-card border-y-transparent border-y-[8px] border-l-0'
            }`} />
            
            <CardContent className="p-6 lg:p-8 relative z-10 text-card-foreground">
              {isEducation ? (
                // Cyberpunk Education Content
                <>
                  {/* Floating Date Badge */}
                  <div className="flex justify-end mb-4 lg:mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <span className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/50 backdrop-blur-sm">
                        <Calendar className="h-3 w-3 mr-1.5 lg:mr-2" />
                        {formatDate((item as Education).start_date)} → {formatDate((item as Education).end_date)}
                      </span>
                      <div className="absolute inset-0 rounded-lg bg-primary/10 blur-md -z-10" />
                    </motion.div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-4 lg:space-y-6">
                    <div className="space-y-2 lg:space-y-3">
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 leading-tight">
                        {(item as Education).degree}
                      </h3>
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <Building className="h-4 w-4 lg:h-5 lg:w-5 text-primary flex-shrink-0" />
                        <h4 className="text-lg lg:text-xl font-semibold text-primary/90">
                          {(item as Education).institution}
                        </h4>
                        {/* Institution Link Icon */}
                        {(item as Education).institution_url && (
                          <motion.a
                            href={(item as Education).institution_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    
                    {/* Field of Study Panel */}
                    <div className="relative p-3 lg:p-4 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30">
                      <div className="absolute top-2 left-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <p className="text-xs font-mono text-primary mb-1 uppercase tracking-wider">Field of Study</p>
                      <p className="text-card-foreground font-medium text-sm lg:text-base">{(item as Education).field_of_study}</p>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4 pt-2">
                      {/* GPA */}
                      {(item as Education).gpa && (
                <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-sm font-mono border border-primary/30"
                        >
                          <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-1.5 lg:mr-2" />
                          GPA: {(item as Education).gpa}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // Cyberpunk Experience Content
                <>
                  {/* Floating Date Badge */}
                  <div className="flex justify-end mb-4 lg:mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <span className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/50 backdrop-blur-sm">
                        <Calendar className="h-3 w-3 mr-1.5 lg:mr-2" />
                        {formatDate((item as Experience).start_date)} → {(item as Experience).end_date ? formatDate((item as Experience).end_date!) : 'ACTIVE'}
                      </span>
                      <div className="absolute inset-0 rounded-lg bg-primary/10 blur-md -z-10" />
                    </motion.div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-4 lg:space-y-6">
                    <div className="space-y-2 lg:space-y-3">
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 leading-tight">
                        {(item as Experience).title}
                      </h3>
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <Building className="h-4 w-4 lg:h-5 lg:w-5 text-primary flex-shrink-0" />
                        <h4 className="text-lg lg:text-xl font-semibold text-primary/90">
                          {(item as Experience).company}
                        </h4>
                        {/* Company Link Icon */}
                        {(item as Experience).company_url && (
                          <motion.a
                            href={(item as Experience).company_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* References Panel */}
                    {(item as Experience).references && (item as Experience).references!.length > 0 && (
                      <div className="space-y-3 lg:space-y-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
                          <h5 className="text-xs lg:text-sm font-semibold text-primary uppercase tracking-wider">
                            Key Contacts
                          </h5>
                          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                        </div>
                        
                        <div className="grid gap-2 lg:gap-3">
                          {(item as Experience).references!.slice(0, 2).map((ref, index) => (
                            <motion.div 
                              key={ref.id}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group relative"
                            >
                              <div className="relative p-3 lg:p-4 rounded-lg bg-gradient-to-r from-card/80 to-card/60 border border-primary/20 backdrop-blur-sm overflow-hidden">
                                {/* Glowing corner accent */}
                                <div className="absolute top-0 right-0 w-3 h-3">
                                  <div className="w-full h-0.5 bg-primary" />
                                  <div className="w-0.5 h-full bg-primary ml-auto" />
                                </div>
                                
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="relative z-10 flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <h6 className="font-semibold text-card-foreground text-xs lg:text-sm mb-1 truncate">
                                      {ref.name}
                                    </h6>
                                    <p className="text-xs text-primary font-medium truncate">
                                      {ref.designation}
                                    </p>
                                  </div>
                                  
                                  {ref.linkedin_url && (
                                    <motion.a
                                      href={ref.linkedin_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="ml-2 lg:ml-3 p-1.5 lg:p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200 flex-shrink-0"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                    </motion.a>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}








