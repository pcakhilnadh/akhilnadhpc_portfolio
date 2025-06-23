from typing import Dict
from ..repositories.home_repository import HomeRepository, IHomeRepository, HomeDomainData
from ..models.response_models import HomeResponse
from ..models.user_profile_models import UserProfile


class HomeService:
    """Service for home endpoint."""
    
    def __init__(self, home_repo: IHomeRepository = HomeRepository()):
        self.home_repo = home_repo
    
    def get_home_details(self, username: str) -> HomeResponse:
        """Get home details including personal data and endpoints."""
        home_info = self.home_repo.get_home_info(username)
        endpoints = self.home_repo.get_endpoints_info()
        personal_data = self.home_repo.get_user_profile(username)
        
        return HomeResponse(
            message=home_info.message,
            status=home_info.status,
            version=home_info.version,
            endpoints=endpoints,
            personal_data=personal_data
        )
    
    def get_endpoints_data(self) -> Dict[str, str]:
        """
        Get endpoints data.
        
        Returns:
            Dict[str, str]: Available endpoints
        """
        return self.home_repo.get_endpoints_info()
    
    def get_user_profile(self, username: str) -> UserProfile:
        """
        Get user profile through repository.
        
        Args:
            username (str): Username for personalization
            
        Returns:
            UserProfile: Complete user profile data
        """
        return self.home_repo.get_user_profile(username) 