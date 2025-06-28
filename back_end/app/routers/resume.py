from fastapi import APIRouter, Depends
from ..models.resume_models import ResumeRequest, ResumeResponse
from ..services.resume_service import ResumeService
from ..core.config import settings


def get_resume_service() -> ResumeService:
    """Dependency injection for resume service."""
    return ResumeService()


router = APIRouter()
logger = settings.get_logger("resume")


@router.get("/resume", summary="Resume endpoint (GET)", tags=["Resume"], response_model=ResumeResponse)
async def resume_get(
    resume_service: ResumeService = Depends(get_resume_service)
) -> ResumeResponse:
    """
    Resume endpoint that provides ATS-friendly resume data via GET request.
    Automatically uses default username "akhilnadhpc".
    
    Args:
        resume_service (ResumeService): Injected service for resume business logic
    
    Returns:
        ResumeResponse: Structured resume data with all sections
    """
    logger.info("Resume GET endpoint accessed with default username: akhilnadhpc")
    
    # Convert GET request to POST by using default username
    resume_data = resume_service.get_resume_data("akhilnadhpc")
    
    return resume_data


@router.post("/resume", summary="Resume endpoint (POST)", tags=["Resume"], response_model=ResumeResponse)
async def resume_post(
    request: ResumeRequest,
    resume_service: ResumeService = Depends(get_resume_service)
) -> ResumeResponse:
    """
    Resume endpoint that provides ATS-friendly resume data via POST request.
    
    Args:
        request (ResumeRequest): Request body containing the username.
        resume_service (ResumeService): Injected service for resume business logic
    
    Returns:
        ResumeResponse: Structured resume data with all sections
    """
    logger.info(f"Resume POST endpoint accessed by user: {request.username}")
    
    resume_data = resume_service.get_resume_data(request.username)
    
    return resume_data 