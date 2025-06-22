from ..repositories.certifications_repository import CertificationsRepository
from ..models.certifications_models import CertificationsDomainData


class CertificationsService:
    """Service for certifications business logic."""
    
    def __init__(self, repository: CertificationsRepository):
        self.repository = repository
    
    def get_certifications_data(self, username: str) -> CertificationsDomainData:
        """Get certifications data for the portfolio."""
        return self.repository.get_certifications_data(username) 