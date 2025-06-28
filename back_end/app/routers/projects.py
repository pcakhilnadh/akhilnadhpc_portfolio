from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.projects_repository import ProjectsRepository
from ..services.projects_service import ProjectsService
from ..models.projects_models import ProjectsDomainData, ProjectDetailResponse

class ProjectsRequest(BaseModel):
    username: str

class ProjectDetailRequest(BaseModel):
    username: str

def get_projects_service() -> ProjectsService:
    """Dependency injection for ProjectsService."""
    repository = ProjectsRepository()
    return ProjectsService(repository)


router = APIRouter()
logger = settings.get_logger("projects")


@router.post("/projects", summary="Projects list endpoint", tags=["Projects"], response_model=ProjectsDomainData)
async def projects(
    request: ProjectsRequest,
    projects_service: ProjectsService = Depends(get_projects_service)
) -> ProjectsDomainData:
    """
    Projects endpoint that provides basic information about the portfolio owner's projects.
    
    Args:
        request (ProjectsRequest): Request body containing the username.
        projects_service (ProjectsService): Injected service for projects business logic
    
    Returns:
        ProjectsDomainData: Structured projects page data with basic projects information
    """
    logger.info(f"Projects list endpoint accessed by user: {request.username}")
    
    projects_data = projects_service.get_projects_data(request.username)
    
    return projects_data


@router.post("/projects/{project_id}", summary="Project detail endpoint", tags=["Projects"], response_model=ProjectDetailResponse)
async def project_detail(
    project_id: str,
    request: ProjectDetailRequest,
    projects_service: ProjectsService = Depends(get_projects_service)
) -> ProjectDetailResponse:
    """
    Project detail endpoint that provides detailed information about a specific project.
    
    Args:
        project_id (str): The ID of the project to retrieve details for.
        request (ProjectDetailRequest): Request body containing the username.
        projects_service (ProjectsService): Injected service for projects business logic
    
    Returns:
        ProjectDetailResponse: Detailed project information
    
    Raises:
        HTTPException: If the project is not found
    """
    logger.info(f"Project detail endpoint accessed by user: {request.username} for project: {project_id}")
    
    project = projects_service.get_project_by_id(request.username, project_id)
    
    if not project:
        raise HTTPException(status_code=404, detail=f"Project with ID {project_id} not found")
    
    return ProjectDetailResponse(
        success=True,
        message=f"Successfully retrieved project details for {project_id}",
        project=project
    ) 