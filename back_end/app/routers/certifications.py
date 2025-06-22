from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..core.config import settings
from ..repositories.certifications_repository import CertificationsRepository
from ..services.certifications_service import CertificationsService
from ..models.certifications_models import CertificationsDomainData

class CertificationsRequest(BaseModel):
    username: str

def get_certifications_service() -> CertificationsService:
    """Dependency injection for CertificationsService."""
    repository = CertificationsRepository()
    return CertificationsService(repository)


router = APIRouter()
logger = settings.get_logger("certifications")


@router.post("/certifications", summary="Certifications endpoint", tags=["Certifications"], response_model=CertificationsDomainData)
async def certifications(
    request: CertificationsRequest,
    certifications_service: CertificationsService = Depends(get_certifications_service)
) -> CertificationsDomainData:
    """
    Certifications endpoint that provides detailed information about the portfolio owner's certifications.
    
    Args:
        request (CertificationsRequest): Request body containing the username.
        certifications_service (CertificationsService): Injected service for certifications business logic
    
    Returns:
        CertificationsDomainData: Structured certifications page data with certifications information
    """
    logger.info(f"Certifications endpoint accessed by user: {request.username}")
    
    certifications_data = certifications_service.get_certifications_data(request.username)
    
    return certifications_data 