from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.timeline_repository import TimelineRepository
from ..services.timeline_service import TimelineService
from ..models.timeline_models import TimelineDomainData

class TimelineRequest(BaseModel):
    username: str

def get_timeline_service() -> TimelineService:
    """Dependency injection for TimelineService."""
    repository = TimelineRepository()
    return TimelineService(repository)


router = APIRouter()
logger = settings.get_logger("timeline")


@router.post("/timeline", summary="Timeline endpoint", tags=["Timeline"], response_model=TimelineDomainData)
async def timeline(
    request: TimelineRequest,
    timeline_service: TimelineService = Depends(get_timeline_service)
) -> TimelineDomainData:
    """
    Timeline endpoint that provides detailed information about the portfolio owner's work experience timeline.
    
    Args:
        request (TimelineRequest): Request body containing the username.
        timeline_service (TimelineService): Injected service for timeline business logic
    
    Returns:
        TimelineDomainData: Structured timeline page data with work experience information
    """
    logger.info(f"Timeline endpoint accessed by user: {request.username}")
    
    timeline_data = timeline_service.get_timeline_data(request.username)
    
    return timeline_data 