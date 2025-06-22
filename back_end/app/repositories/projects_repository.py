from typing import List
from ..core.config import settings
from ..models.projects_models import ProjectsDomainData, Project, IProjectsRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class ProjectsRepository(IProjectsRepository):
    """Repository for projects endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        """Get projects information."""
        # Read projects from CSV data
        projects = self._get_projects_data(username)
        
        return ProjectsDomainData(
            projects=projects,
            welcome_text="what_have_i_built?"
        )
    
    def _get_projects_data(self, username: str) -> List[Project]:
        """Get projects data from CSV."""
        try:
            import csv
            import os
            
            # Path to projects CSV file
            projects_path = os.path.join(self.data_access.csv_data_path, "projects", "projects.csv")
            
            projects = []
            with open(projects_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        # Parse technologies string to list
                        technologies = row.get('technologies', '').split(',') if row.get('technologies') else []
                        technologies = [tech.strip() for tech in technologies if tech.strip()]
                        
                        projects.append(
                            Project(
                                id=int(row.get('id', len(projects) + 1)),
                                title=row['title'],
                                description=row['description'],
                                technologies=technologies,
                                github_url=row.get('github_url'),
                                live_url=row.get('live_url'),
                                image_url=row.get('image_url'),
                                category=row.get('category', 'Web Development'),
                                completion_date=row.get('completion_date')
                            )
                        )
            
            return projects
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading projects for {username}: {e}")
            return [] 