from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.home_repository import HomeRepository
from ..services.home_service import HomeService
from ..models.home_models import HomeResponse


class HomeRequest(BaseModel):
    username: str


def get_home_service() -> HomeService:
    """Dependency injection for HomeService."""
    repository = HomeRepository()
    return HomeService(repository)


router = APIRouter()
logger = settings.get_logger("home")


@router.post("/", summary="Home endpoint", tags=["Home"], response_model=HomeResponse)
async def home(
    request: HomeRequest,
    home_service: HomeService = Depends(get_home_service)
) -> HomeResponse:
    """
    Home endpoint that provides a welcome message, API status, and personal data.
    
    Args:
        request (HomeRequest): Request body containing the username.
        home_service (HomeService): Injected service for home business logic.
    
    Returns:
        HomeResponse: Structured home page data.
    """
    logger.info(f"Home endpoint accessed by user: {request.username}")
    
    home_data = home_service.get_home_data(request.username)
    endpoints_data = home_service.get_endpoints_data()
    personal_data = home_service.get_personal_data(request.username)
    
    return HomeResponse(
        success=True,
        message=home_data.message,
        status=home_data.status,
        version=home_data.version,
        endpoints=endpoints_data,
        personal_data=personal_data,
        page_welcome_texts="who_am_i?"
    ) 