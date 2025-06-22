from typing import List
from ..core.config import settings
from ..models.timeline_models import TimelineDomainData, Experience, ITimelineRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class TimelineRepository(ITimelineRepository):
    """Repository for timeline endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline information."""
        # Read work experience from CSV data
        experiences = self._get_work_experience_data(username)
        
        return TimelineDomainData(
            experiences=experiences,
            welcome_text="where_did_i_start?"
        )
    
    def _get_work_experience_data(self, username: str) -> List[Experience]:
        """Get work experience data from CSV."""
        try:
            import csv
            import os
            
            # Path to work experience CSV file
            work_exp_path = os.path.join(self.data_access.csv_data_path, "work_experience", "work_experience.csv")
            
            experiences = []
            with open(work_exp_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        # Parse technologies string to list
                        technologies = row.get('technologies', '').split(',') if row.get('technologies') else []
                        technologies = [tech.strip() for tech in technologies if tech.strip()]
                        
                        # Parse achievements string to list
                        achievements = row.get('achievements', '').split(',') if row.get('achievements') else []
                        achievements = [achievement.strip() for achievement in achievements if achievement.strip()]
                        
                        experiences.append(
                            Experience(
                                id=int(row.get('id', len(experiences) + 1)),
                                title=row['job_title'],
                                company=row['company_name'],
                                start_date=row['start_date'],
                                end_date=row.get('end_date'),
                                description=row['job_description'],
                                technologies=technologies if technologies else None,
                                achievements=achievements if achievements else None
                            )
                        )
            
            # Sort by start date (most recent first)
            experiences.sort(key=lambda x: x.start_date, reverse=True)
            
            return experiences
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading work experience for {username}: {e}")
            return [] 