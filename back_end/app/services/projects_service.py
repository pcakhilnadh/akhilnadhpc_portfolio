from typing import Optional
from ..repositories.projects_repository import ProjectsRepository
from ..models.projects_models import ProjectsDomainData, Project


class ProjectsService:
    """Service for projects business logic."""
    
    def __init__(self, repository: ProjectsRepository):
        self.repository = repository
    
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        """Get basic projects data for the portfolio."""
        return self.repository.get_projects_data(username)
    
    def get_project_by_id(self, username: str, project_id: str) -> Optional[Project]:
        """Get detailed project information by ID."""
        return self.repository.get_project_by_id(username, project_id) 