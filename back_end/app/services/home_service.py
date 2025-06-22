from typing import Dict
from ..models.home_models import HomeDomainData, PersonalData, IHomeRepository


class HomeService:
    """Service for home endpoint business logic."""
    
    def __init__(self, repository: IHomeRepository):
        self.repository = repository
    
    def get_home_data(self, username: str) -> HomeDomainData:
        """
        Get home data through repository.
        
        Args:
            username (str): Username for personalization
            
        Returns:
            HomeDomainData: Domain model with home information
        """
        return self.repository.get_home_info(username)
    
    def get_endpoints_data(self) -> Dict[str, str]:
        """
        Get endpoints data.
        
        Returns:
            Dict[str, str]: Available endpoints
        """
        return self.repository.get_endpoints_info()
    
    def get_personal_data(self, username: str) -> PersonalData:
        """
        Get personal data through repository.
        
        Args:
            username (str): Username for personalization
            
        Returns:
            PersonalData: Personal data for the portfolio
        """
        return self.repository.get_personal_data(username) 