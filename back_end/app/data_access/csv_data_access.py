import csv
import os
from datetime import datetime
from typing import Dict, Optional, List
from ..core.config import settings
from .interfaces import IPersonalDataAccess


class CSVDataAccess(IPersonalDataAccess):
    """Data access layer for CSV file operations."""
    
    def __init__(self):
        self.csv_data_path = os.path.join(os.path.dirname(__file__), "..", "..", "csv_data")
        self.logger = settings.get_logger("csv_data_access")
    
    def read_personal_profile(self, username: str) -> Optional[Dict[str, str]]:
        """Read personal profile data from CSV."""
        personal_profiles_path = os.path.join(self.csv_data_path, "personal", "personal_profiles.csv")
        
        try:
            with open(personal_profiles_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['_id'] == username:
                        return row
            return None
        except Exception as e:
            self.logger.error(f"Error reading personal profile for {username}: {e}")
            return None
    
    def read_profiles(self, username: str, profile_type: str) -> List[Dict[str, str]]:
        """Read profiles by type from CSV (handles all profile types)."""
        social_profiles_path = os.path.join(self.csv_data_path, "personal", "social_profiles.csv")
        profiles = []
        
        try:
            with open(social_profiles_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['personal_profile_id'] == username:
                        # Categorize profiles based on platform name
                        platform = row['platform'].lower().strip()
                        
                        # Define profile type mappings
                        if profile_type == "social" and platform in ['linkedin', 'twitter', 'instagram']:
                            profiles.append(row)
                        elif profile_type == "professional" and platform in ['linkedin', 'portfolio website']:
                            profiles.append(row)
                        elif profile_type == "coding" and platform in ['github', 'kaggle', 'hackerrank', 'hackerearth', 'leetcode', 'stack overflow', 'cs stack exchange', 'gate overflow']:
                            profiles.append(row)
                        elif profile_type == "personal" and platform in ['medium', 'portfolio website', 'tripoto', 'google map reviewer profile']:
                            profiles.append(row)
            
            self.logger.info(f"Found {len(profiles)} {profile_type} profiles for {username}")
            return profiles
        except Exception as e:
            self.logger.error(f"Error reading {profile_type} profiles for {username}: {e}")
            return []
    
    def read_family_info(self, username: str) -> List[Dict[str, str]]:
        """Read family information from CSV."""
        family_path = os.path.join(self.csv_data_path, "personal", "family_members.csv")
        family_members = []
        
        try:
            with open(family_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['personal_profile_id'] == username:
                        family_members.append(row)
            
            self.logger.info(f"Found {len(family_members)} family members for {username}")
            return family_members
        except Exception as e:
            self.logger.error(f"Error reading family info for {username}: {e}")
            return []
    
    def read_hobbies(self, username: str) -> List[Dict[str, str]]:
        """Read hobbies information from CSV."""
        hobbies_path = os.path.join(self.csv_data_path, "personal", "hobbies.csv")
        hobbies = []
        
        try:
            with open(hobbies_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['personal_profile_id'] == username:
                        hobbies.append(row)
            
            self.logger.info(f"Found {len(hobbies)} hobbies for {username}")
            return hobbies
        except Exception as e:
            self.logger.error(f"Error reading hobbies for {username}: {e}")
            return []
    
    def calculate_years_of_experience(self, work_start_date_str: str) -> float:
        """Calculate years of experience from work start date."""
        try:
            work_start_date = datetime.strptime(work_start_date_str, '%Y-%m-%d')
            current_date = datetime.now()
            
            # Calculate total days difference
            days_difference = (current_date - work_start_date).days
            years_of_experience = days_difference / 365.25  # Using 365.25 to account for leap years
            
            return round(max(0.0, years_of_experience), 1)
        except Exception as e:
            self.logger.error(f"Error calculating years of experience: {e}")
            return 0.0
    
    def read_skills_data(self) -> List[Dict[str, str]]:
        """Read all skills data from CSV."""
        skills_path = os.path.join(self.csv_data_path, "skills", "skills.csv")
        skills = []
        try:
            with open(skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    skills.append(row)
            self.logger.info(f"Found {len(skills)} skills in skills.csv")
            return skills
        except Exception as e:
            self.logger.error(f"Error reading skills data: {e}")
            return []
    
    def read_education(self, username: str) -> List[Dict[str, str]]:
        """Read education data from CSV."""
        education_path = os.path.join(self.csv_data_path, "personal", "education.csv")
        education = []
        
        try:
            with open(education_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['personal_profile_id'] == username:
                        education.append(row)
            
            self.logger.info(f"Found {len(education)} education records for {username}")
            return education
        except Exception as e:
            self.logger.error(f"Error reading education for {username}: {e}")
            return []
    
    def read_work_experience(self, username: str) -> List[Dict[str, str]]:
        """Read work experience data from CSV."""
        work_exp_path = os.path.join(self.csv_data_path, "work_experience", "work_experience.csv")
        work_experience = []
        
        try:
            with open(work_exp_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        work_experience.append(row)
            
            self.logger.info(f"Found {len(work_experience)} work experience records for {username}")
            return work_experience
        except Exception as e:
            self.logger.error(f"Error reading work experience for {username}: {e}")
            return []
    
    def read_projects(self, username: str) -> List[Dict[str, str]]:
        """Read projects data from CSV."""
        projects_path = os.path.join(self.csv_data_path, "projects", "projects.csv")
        projects = []
        
        try:
            with open(projects_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        projects.append(row)
            
            self.logger.info(f"Found {len(projects)} projects for {username}")
            return projects
        except Exception as e:
            self.logger.error(f"Error reading projects for {username}: {e}")
            return []
    
    def read_certifications(self, username: str) -> List[Dict[str, str]]:
        """Read certifications data from CSV."""
        certs_path = os.path.join(self.csv_data_path, "certifications", "certifications.csv")
        certifications = []
        
        try:
            with open(certs_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        certifications.append(row)
            
            self.logger.info(f"Found {len(certifications)} certifications for {username}")
            return certifications
        except Exception as e:
            self.logger.error(f"Error reading certifications for {username}: {e}")
            return []
    
    def read_project_skills(self) -> List[Dict[str, str]]:
        """Read project skills relationship data from CSV."""
        project_skills_path = os.path.join(self.csv_data_path, "projects", "project_skills.csv")
        project_skills = []
        
        try:
            with open(project_skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    project_skills.append(row)
            
            self.logger.info(f"Found {len(project_skills)} project-skill relationships")
            return project_skills
        except Exception as e:
            self.logger.error(f"Error reading project skills data: {e}")
            return [] 