from ..repositories.timeline_repository import TimelineRepository
from ..models.timeline_models import TimelineDomainData


class TimelineService:
    """Service for timeline business logic."""
    
    def __init__(self, repository: TimelineRepository):
        self.repository = repository
    
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline data for the portfolio."""
        return self.repository.get_timeline_data(username) 