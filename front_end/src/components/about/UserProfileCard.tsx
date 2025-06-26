import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Users, 
  Heart, 
  User, 
  Building2, 
  Clock, 
  Home,
  UserCheck,
  GraduationCap,
  Link
} from 'lucide-react';
import { PersonalInfo, FamilyMember } from '@/types/data';

interface UserProfileCardProps {
  personalInfo: PersonalInfo;
  familyInfo?: FamilyMember[];
  hobbies?: string[];
}

// Function to calculate age from date of birth
const calculateAge = (dob: string): string => {
  try {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} years`;
  } catch (error) {
    return "Not specified";
  }
};

export default function UserProfileCard({ personalInfo, familyInfo, hobbies }: UserProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section with Gradient Background */}
        <div className="relative h-40 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
          
          {/* Profile Avatar */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-white/10 overflow-hidden">
                {personalInfo.profile_image ? (
                  <img 
                    src={personalInfo.profile_image} 
                    alt={personalInfo.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`${personalInfo.profile_image ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
                  {personalInfo.full_name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-background flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Name and Tagline */}
          <div className="absolute left-32 right-8 top-1/2 transform -translate-y-1/2">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white drop-shadow-lg tracking-tight">
                {personalInfo.full_name}
              </h3>
              <p className="text-white/80 text-sm font-medium drop-shadow-md tracking-wide leading-relaxed max-w-xs">
                {personalInfo.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Quick Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 gap-4"
            >
              {/* Professional Details */}
              <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-colors">
                <h4 className="font-semibold text-foreground mb-3 text-base flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-primary" />
                  Professional Details
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <Building2 className="h-3 w-3 mr-1" />
                      Designation
                    </span>
                    <span className="text-sm text-foreground font-medium">{personalInfo.designation}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Experience
                    </span>
                    <span className="text-sm text-foreground font-medium">{personalInfo.total_years_of_experience || 'Not specified'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <Building2 className="h-3 w-3 mr-1" />
                      Current Company
                    </span>
                    <span className="text-sm text-foreground font-medium">{personalInfo.current_company || 'Not specified'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Avg. Time in Company
                    </span>
                    <span className="text-sm text-foreground font-medium">{personalInfo.average_time_in_company || 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-colors">
                <h4 className="font-semibold text-foreground mb-3 text-base flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Personal Information
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Age
                    </span>
                    <span className="text-sm text-foreground font-medium">{personalInfo.dob ? calculateAge(personalInfo.dob) : 'Not specified'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Birth Place
                    </span>
                    <span className="text-sm text-foreground font-medium">{personalInfo.place_of_birth || 'Not specified'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center">
                      <Home className="h-3 w-3 mr-1" />
                      Address
                    </span>
                    <span className="text-sm text-foreground font-medium leading-relaxed">{personalInfo.address || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-colors">
                <h4 className="font-semibold text-foreground mb-3 text-base flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Family Members
                </h4>
                <div className="space-y-2">
                  {familyInfo && familyInfo.length > 0 ? (
                    familyInfo.map((member, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3 border border-border/30 hover:border-primary/20 transition-all duration-200 hover:shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <UserCheck className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  {member.profile_url ? (
                                    <a 
                                      href={member.profile_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center space-x-1"
                                      title="View Profile"
                                    >
                                      <span className="truncate">{member.full_name}</span>
                                      <Link className="h-3 w-3 text-primary flex-shrink-0" />
                                    </a>
                                  ) : (
                                    <h5 className="text-sm font-semibold text-foreground truncate">{member.full_name}</h5>
                                  )}
                                </div>
                                {member.age && (
                                  <div className="bg-primary/10 px-2 py-1 rounded-full flex-shrink-0">
                                    <span className="text-xs font-medium text-primary">{member.age}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span className="bg-muted px-2 py-0.5 rounded-full capitalize">{member.relationship}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <GraduationCap className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{member.occupation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">No family information available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hobbies & Interests */}
              <div className="bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-colors">
                <h4 className="font-semibold text-foreground mb-3 text-base flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-primary" />
                  Hobbies & Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hobbies && hobbies.length > 0 ? (
                    hobbies.map((hobby, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs px-3 py-1 bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary font-medium"
                      >
                        {hobby}
                      </Badge>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">No hobbies or interests available</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}