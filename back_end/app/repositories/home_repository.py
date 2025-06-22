from typing import Dict
from ..core.config import settings
from ..models.home_models import HomeDomainData, PersonalData, BasicInfo, Profile, IHomeRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class HomeRepository(IHomeRepository):
    """Repository for home endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.api_version = settings.api_version
        self.data_access = data_access or CSVDataAccess()
    
    def get_home_info(self, username: str) -> HomeDomainData:
        """Get home information."""
        return HomeDomainData(
            username=username,
            message=f"Hello, {username}! Welcome to the Portfolio API.",
            status="active",
            version=self.api_version
        )
    
    def get_endpoints_info(self) -> Dict[str, str]:
        """Get available endpoints."""
        return {
            "home": "/",
            "about": "/about",
            "docs": "/docs"
        }
    
    def get_personal_data(self, username: str) -> PersonalData:
        """Get personal data for the portfolio."""
        # Read basic info from personal profiles CSV
        basic_info = self._get_basic_info(username)
        
        # Read social profiles
        social_profiles = self._get_profiles_by_type(username, "social")
        professional_profiles = self._get_profiles_by_type(username, "professional")
        coding_profiles = self._get_profiles_by_type(username, "coding")
        personal_profiles = self._get_profiles_by_type(username, "personal")
        
        return PersonalData(
            basic_info=basic_info,
            social_profiles=social_profiles,
            professional_profiles=professional_profiles,
            coding_profiles=coding_profiles,
            personal_profiles=personal_profiles
        )
    
    def _get_basic_info(self, username: str) -> BasicInfo:
        """Get basic information using data access layer."""
        profile_data = self.data_access.read_personal_profile(username)
        
        if profile_data:
            years_of_experience = self.data_access.calculate_years_of_experience(
                profile_data['work_start_date']
            )
            
            return BasicInfo(
                full_name=profile_data['full_name'],
                tagline=profile_data['tagline'],
                short_summary=profile_data['short_summary'],
                designation=profile_data['tagline'].split(' at ')[0] if ' at ' in profile_data['tagline'] else profile_data['tagline'],
                total_years_of_experiece=f"{years_of_experience}",
                email=profile_data['email'],
                profile_image=profile_data['profile_image']
            )
        
        # Return default data if user not found
        return BasicInfo(
            full_name="Default User",
            tagline="Default Tagline",
            short_summary="Default summary",
            designation="Default Role",
            total_years_of_experiece="0.0",
            email="default@example.com",
            profile_image=""
        )
    
    def _get_profiles_by_type(self, username: str, profile_type: str) -> Dict[str, Profile]:
        """Get profiles by type using data access layer."""
        profile_data_list = self.data_access.read_social_profiles(username, profile_type)
        profiles = {}
        
        for profile_data in profile_data_list:
            platform = profile_data['platform'].lower().replace(' ', '_')
            profiles[platform] = Profile(
                url=profile_data['url'],
                handler=profile_data['handler']
            )
        
        return profiles 