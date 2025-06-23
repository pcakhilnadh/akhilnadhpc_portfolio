from typing import Dict, List
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field
from ..core.config import settings
from ..models.user_profile_models import UserProfile, PersonalInfo, Profile, FamilyMember
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess

class HomeDomainData(BaseModel):
    """Domain model for home endpoint data."""
    username: str = Field(description="Username")
    message: str = Field(description="Welcome message")
    status: str = Field(description="API status")
    version: str = Field(description="API version")

class IHomeRepository(ABC):
    """Abstract interface for home data access."""
    
    @abstractmethod
    def get_home_info(self, username: str) -> HomeDomainData:
        """Get home information."""
        pass
    
    @abstractmethod
    def get_user_profile(self, username: str) -> UserProfile:
        """Get the complete user profile."""
        pass

    @abstractmethod
    def get_endpoints_info(self) -> Dict[str, str]:
        """Get available endpoints."""
        pass

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
            "skills": "/skills",
            "projects": "/projects",
            "certifications": "/certifications",
            "timeline": "/timeline",
            "docs": "/docs"
        }
    
    def get_user_profile(self, username: str) -> UserProfile:
        """Get the complete user profile data."""
        profile_data = self.data_access.read_personal_profile(username)
        
        personal_info = PersonalInfo(
            full_name=profile_data.get('full_name'),
            tagline=profile_data.get('tagline'),
            designation=profile_data.get('designation'),
            email=profile_data.get('email'),
            profile_image=profile_data.get('profile_image'),
            short_summary=profile_data.get('short_summary'),
            long_descriptive_summary=profile_data.get('long_descriptive_summary')
        )
        
        social_profiles = self._get_profiles_by_type(username, "social")
        professional_profiles = self._get_profiles_by_type(username, "professional")
        coding_profiles = self._get_profiles_by_type(username, "coding")
        personal_profiles = self._get_profiles_by_type(username, "personal")
        
        family_info = self._get_family_info(username)
        hobbies = self._get_hobbies(username)

        return UserProfile(
            personal_info=personal_info,
            social_profiles=social_profiles,
            professional_profiles=professional_profiles,
            coding_profiles=coding_profiles,
            personal_profiles=personal_profiles,
            family_info=family_info,
            hobbies=hobbies
        )

    def _get_profiles_by_type(self, username: str, profile_type: str) -> Dict[str, Profile]:
        """Get profiles from CSV based on their type."""
        profiles_data = self.data_access.read_profiles(username, profile_type)
        return {
            profile['profile_name']: Profile(url=profile['url'], handler=profile['handler'])
            for profile in profiles_data
        }

    def _get_family_info(self, username: str) -> List[FamilyMember]:
        """Reads family info from CSV."""
        family_data = self.data_access.read_family_info(username)
        return [FamilyMember(**member) for member in family_data]

    def _get_hobbies(self, username: str) -> List[str]:
        """Reads hobbies from CSV."""
        hobbies_data = self.data_access.read_hobbies(username)
        return [hobby['hobby_name'] for hobby in hobbies_data] 