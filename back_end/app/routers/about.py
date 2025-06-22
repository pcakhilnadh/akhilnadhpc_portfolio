from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.about_repository import AboutRepository
from ..services.about_service import AboutService
from ..models.about_models import AboutDomainData

class AboutRequest(BaseModel):
    username: str

def get_about_service() -> AboutService:
    """Dependency injection for AboutService."""
    repository = AboutRepository()
    return AboutService(repository)


router = APIRouter()
logger = settings.get_logger("about")


@router.post("/about", summary="About endpoint", tags=["About"], response_model=AboutDomainData)
async def about(
    request: AboutRequest,
    about_service: AboutService = Depends(get_about_service)
) -> AboutDomainData:
    """
    About endpoint that provides detailed information about the portfolio owner.
    
    Args:
        request (AboutRequest): Request body containing the username
        about_service (AboutService): Injected service for about business logic
    
    Returns:
        AboutDomainData: Structured about page data with personal info, skills, hobbies, and family details
    """
    logger.info(f"About endpoint accessed by user: {request.username}")
    
    about_data = about_service.get_about_data(request.username)
    
    return about_data 