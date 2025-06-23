from ..repositories.timeline_repository import TimelineRepository, TimelineDomainData
from ..repositories.work_experience_repository import WorkExperienceRepository
from ..repositories.education_repository import EducationRepository


class TimelineService:
    """Service for timeline business logic."""
    
    def __init__(self, timeline_repository: TimelineRepository = None):
        # Can use the orchestrated repository or individual repositories
        self.timeline_repository = timeline_repository or TimelineRepository()
        
        # Alternative: Direct access to specialized repositories
        # self.work_experience_repo = WorkExperienceRepository()
        # self.education_repo = EducationRepository()
    
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline data for the portfolio."""
        return self.timeline_repository.get_timeline_data(username)
    
    # Future methods for more granular control:
    # def get_work_experience_only(self, username: str):
    #     """Get only work experience data."""
    #     return self.work_experience_repo.get_work_experience_data(username)
    # 
    # def get_education_only(self, username: str):
    #     """Get only education data."""
    #     return self.education_repo.get_education_data(username) 