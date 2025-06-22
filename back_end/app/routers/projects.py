from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.projects_repository import ProjectsRepository
from ..services.projects_service import ProjectsService
from ..models.projects_models import ProjectsDomainData

class ProjectsRequest(BaseModel):
    username: str

def get_projects_service() -> ProjectsService:
    """Dependency injection for ProjectsService."""
    repository = ProjectsRepository()
    return ProjectsService(repository)


router = APIRouter()
logger = settings.get_logger("projects")


@router.post("/projects", summary="Projects endpoint", tags=["Projects"], response_model=ProjectsDomainData)
async def projects(
    request: ProjectsRequest,
    projects_service: ProjectsService = Depends(get_projects_service)
) -> ProjectsDomainData:
    """
    Projects endpoint that provides detailed information about the portfolio owner's projects.
    
    Args:
        request (ProjectsRequest): Request body containing the username.
        projects_service (ProjectsService): Injected service for projects business logic
    
    Returns:
        ProjectsDomainData: Structured projects page data with projects information
    """
    logger.info(f"Projects endpoint accessed by user: {request.username}")
    
    projects_data = projects_service.get_projects_data(request.username)
    
    return projects_data 