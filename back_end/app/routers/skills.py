from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.skills_repository import SkillsRepository
from ..services.skills_service import SkillsService
from ..models.skills_models import SkillsDomainData

class SkillsRequest(BaseModel):
    username: str

def get_skills_service() -> SkillsService:
    """Dependency injection for SkillsService."""
    repository = SkillsRepository()
    return SkillsService(repository)


router = APIRouter()
logger = settings.get_logger("skills")


@router.post("/skills", summary="Skills endpoint", tags=["Skills"], response_model=SkillsDomainData)
async def skills(
    request: SkillsRequest,
    skills_service: SkillsService = Depends(get_skills_service)
) -> SkillsDomainData:
    """
    Skills endpoint that provides detailed information about the portfolio owner's skills.
    
    Args:
        request (SkillsRequest): Request body containing the username.
        skills_service (SkillsService): Injected service for skills business logic
    
    Returns:
        SkillsDomainData: Structured skills page data with skills information
    """
    logger.info(f"Skills endpoint accessed by user: {request.username}")
    
    skills_data = skills_service.get_skills_data(request.username)
    
    return skills_data 