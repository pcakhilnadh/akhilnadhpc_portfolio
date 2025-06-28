from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.services_repository import ServicesRepository
from ..services.services_service import ServicesService
from ..models.services_models import ServicesDomainData, ServiceDetailResponse

class ServicesRequest(BaseModel):
    username: str

class ServiceDetailRequest(BaseModel):
    username: str

def get_services_service() -> ServicesService:
    """Dependency injection for ServicesService."""
    repository = ServicesRepository()
    return ServicesService(repository)

router = APIRouter()
logger = settings.get_logger("services")

@router.post("/services", summary="Services endpoint", tags=["Services"], response_model=ServicesDomainData)
async def services(
    request: ServicesRequest,
    services_service: ServicesService = Depends(get_services_service)
) -> ServicesDomainData:
    """
    Services endpoint that provides detailed information about available services.
    
    Args:
        request (ServicesRequest): Request body containing the username.
        services_service (ServicesService): Injected service for services business logic
    
    Returns:
        ServicesDomainData: Structured services page data with services information
    """
    logger.info(f"Services endpoint accessed by user: {request.username}")
    
    services_data = services_service.get_services_data(request.username)
    
    return services_data

@router.post("/services/{service_id}", summary="Service detail endpoint", tags=["Services"], response_model=ServiceDetailResponse)
async def service_detail(
    service_id: int,
    request: ServiceDetailRequest,
    services_service: ServicesService = Depends(get_services_service)
) -> ServiceDetailResponse:
    """
    Service detail endpoint that provides detailed information about a specific service.
    
    Args:
        service_id (int): The ID of the service to retrieve details for.
        request (ServiceDetailRequest): Request body containing the username.
        services_service (ServicesService): Injected service for services business logic
    
    Returns:
        ServiceDetailResponse: Detailed service information
    
    Raises:
        HTTPException: If the service is not found
    """
    logger.info(f"Service detail endpoint accessed by user: {request.username} for service: {service_id}")
    
    service = services_service.get_service_by_id(request.username, service_id)
    
    if not service:
        raise HTTPException(status_code=404, detail=f"Service with ID {service_id} not found")
    
    return ServiceDetailResponse(
        success=True,
        message=f"Successfully retrieved service details for {service_id}",
        service=service
    ) 