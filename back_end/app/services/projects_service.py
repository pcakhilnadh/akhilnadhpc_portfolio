from ..repositories.projects_repository import ProjectsRepository
from ..models.projects_models import ProjectsDomainData


class ProjectsService:
    """Service for projects business logic."""
    
    def __init__(self, repository: ProjectsRepository):
        self.repository = repository
    
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        """Get projects data for the portfolio."""
        return self.repository.get_projects_data(username) 