from typing import List, Optional
from ..repositories.services_repository import ServicesRepository, IServicesRepository
from ..models.services_models import Service, ServicesDomainData


class ServicesService:
    """Service for services endpoint business logic."""
    
    def __init__(self, repository: IServicesRepository):
        self.repository = repository
    
    def get_services_data(self, username: str) -> ServicesDomainData:
        """
        Get services data through repository.
        
        Args:
            username (str): Username for personalization
            
        Returns:
            ServicesDomainData: Domain model with services information
        """
        return self.repository.get_services_data(username)
    
    def get_service_by_id(self, username: str, service_id: int) -> Optional[Service]:
        """
        Get service by ID through repository.
        
        Args:
            username (str): Username for personalization
            service_id (int): ID of the service to retrieve
            
        Returns:
            Optional[Service]: Service if found, None otherwise
        """
        return self.repository.get_service_by_id(username, service_id)
    
    def get_services_by_category(self, username: str, category: str) -> List[Service]:
        """
        Get services by category through repository.
        
        Args:
            username (str): Username for personalization
            category (str): Category to filter by
            
        Returns:
            List[Service]: List of services in the specified category
        """
        return self.repository.get_services_by_category(username, category) 