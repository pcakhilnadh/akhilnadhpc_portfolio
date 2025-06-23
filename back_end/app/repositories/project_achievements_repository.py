from typing import List, Optional
from ..models.project_achievements_models import ProjectAchievement, ProjectAchievementBase
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class ProjectAchievementsRepository:
    """Repository for project achievements data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_achievements_by_project_id(self, project_id: str) -> List[ProjectAchievementBase]:
        """Get simplified achievements for a specific project."""
        try:
            import csv
            import os
            
            # Path to project achievements CSV file
            achievements_path = os.path.join(self.data_access.csv_data_path, "projects", "project_achievements.csv")
            
            achievements = []
            with open(achievements_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['project_id'] == project_id:
                        # Create simplified achievement object (baseline data only)
                        achievements.append(
                            ProjectAchievementBase(
                                id=row['_id'],
                                achievement_title=row['achievement_title']
                            )
                        )
            
            return achievements
            
        except Exception as e:
            self.data_access.logger.error(f"Error getting achievements for project {project_id}: {e}")
            return []
    
    def get_achievement_by_id(self, achievement_id: str) -> Optional[ProjectAchievement]:
        """Get full achievement information by ID."""
        try:
            import csv
            import os
            
            # Path to project achievements CSV file
            achievements_path = os.path.join(self.data_access.csv_data_path, "projects", "project_achievements.csv")
            
            with open(achievements_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['_id'] == achievement_id:
                        return ProjectAchievement(
                            id=row['_id'],
                            achievement_title=row['achievement_title'],
                            achievement_description=row['achievement_description']
                        )
            
            return None
            
        except Exception as e:
            self.data_access.logger.error(f"Error getting achievement by ID {achievement_id}: {e}")
            return None 