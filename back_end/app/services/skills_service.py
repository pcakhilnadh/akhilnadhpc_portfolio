from ..repositories.skills_repository import SkillsRepository
from ..models.skills_models import SkillsDomainData


class SkillsService:
    """Service for skills business logic."""
    
    def __init__(self, repository: SkillsRepository):
        self.repository = repository
    
    def get_skills_data(self, username: str) -> SkillsDomainData:
        """Get skills data for the portfolio."""
        return self.repository.get_skills_data(username) 