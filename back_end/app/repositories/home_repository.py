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
        if profile_data is None:
            profile_data = {
                'full_name': 'Default User',
                'tagline': 'Welcome to the Portfolio',
                'designation': 'N/A',
                'email': 'default@example.com',
                'profile_image': None,
                'short_summary': 'This is a default user profile.',
                'long_descriptive_summary': 'No detailed biography available.',
            }
        
        # Calculate missing fields like in AboutRepository
        years_of_experience = 0.0
        current_company = "Not specified"
        average_time_in_company = "Not specified"
        address = ""
        
        if profile_data.get('work_start_date'):
            years_of_experience = self.data_access.calculate_years_of_experience(profile_data['work_start_date'])
            work_experience = self._get_work_experience(username)
            current_company = self._get_current_company(work_experience)
            average_time_in_company = self._calculate_average_time_in_company(work_experience, years_of_experience)
        
        # Format address
        address_parts = [
            profile_data.get('address_city', ''),
            profile_data.get('address_state', ''), 
            profile_data.get('address_country', '')
        ]
        address = ", ".join([part for part in address_parts if part.strip()])
        
        personal_info = PersonalInfo(
            full_name=profile_data.get('full_name'),
            tagline=profile_data.get('tagline'),
            designation=profile_data.get('designation'),
            email=profile_data.get('email'),
            profile_image=profile_data.get('profile_image'),
            short_summary=profile_data.get('short_summary'),
            long_descriptive_summary=profile_data.get('long_descriptive_summary'),
            total_years_of_experience=f"{years_of_experience} years" if years_of_experience > 0 else None,
            current_company=current_company if current_company != "Not specified" else None,
            average_time_in_company=average_time_in_company if average_time_in_company != "Not specified" else None,
            dob=profile_data.get('dob'),
            place_of_birth=profile_data.get('place_of_birth'),
            address=address if address else None
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
            profile['platform']: Profile(url=profile['profile_url'], handler=profile['username'])
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
    
    def _get_work_experience(self, username: str) -> List:
        """Get work experience data for the user."""
        try:
            from .work_experience_repository import WorkExperienceRepository
            work_exp_repo = WorkExperienceRepository(self.data_access)
            experiences = work_exp_repo.get_work_experience_data(username)
            return experiences
        except Exception:
            return []
    
    def _get_current_company(self, work_experience: List) -> str:
        """Get current company from work experience."""
        if not work_experience:
            return "Not specified"
        
        # Find the most recent experience (one without end_date)
        current_job = None
        for exp in work_experience:
            if exp.end_date is None:  # Current job
                current_job = exp
                break
        
        return current_job.company if current_job else "Not specified"
    
    def _calculate_average_time_in_company(self, work_experience: List, total_years: float) -> str:
        """Calculate average time spent in companies (excluding current job)."""
        if not work_experience:
            return "Not specified"
        
        from datetime import datetime
        
        total_duration_years = 0.0
        completed_companies = 0
        
        for exp in work_experience:
            # Skip current job (no end_date) - only count completed tenures
            if exp.end_date is None:
                continue
                
            try:
                start_date = datetime.strptime(exp.start_date, '%Y-%m-%d')
                end_date = datetime.strptime(exp.end_date, '%Y-%m-%d')
                
                # Calculate duration in years for this completed job
                duration_days = (end_date - start_date).days
                duration_years = duration_days / 365.25
                total_duration_years += duration_years
                completed_companies += 1
                
            except (ValueError, AttributeError) as e:
                # If date parsing fails, skip this experience
                continue
        
        if completed_companies == 0:
            return "Not specified"
        
        avg_years = total_duration_years / completed_companies
        
        if avg_years >= 1:
            return f"{avg_years:.1f} years"
        else:
            months = avg_years * 12
            return f"{months:.0f} months" 