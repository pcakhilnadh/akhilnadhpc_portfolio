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
    
    def read_social_profiles(self, username: str, profile_type: str) -> List[Dict[str, str]]:
        """Read social profiles by type from CSV."""
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
                        if profile_type == "social" and platform in ['linkedin', 'twitter']:
                            profiles.append(row)
                        elif profile_type == "professional" and platform in ['linkedin', 'portfolio website']:
                            profiles.append(row)
                        elif profile_type == "coding" and platform in ['github', 'kaggle']:
                            profiles.append(row)
                        elif profile_type == "personal" and platform in ['medium', 'portfolio website']:
                            profiles.append(row)
            
            self.logger.info(f"Found {len(profiles)} {profile_type} profiles for {username}")
            return profiles
        except Exception as e:
            self.logger.error(f"Error reading {profile_type} profiles for {username}: {e}")
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