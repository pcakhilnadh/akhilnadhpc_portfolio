from typing import List, Optional
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field
from ..models.user_profile_models import PersonalInfo, FamilyMember
from ..models.skills_models import SkillCategoryWithSkills
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess
from ..core.config import settings
from .skills_repository import SkillsRepository

class AboutDomainData(BaseModel):
    """Domain model for about endpoint data."""
    personal_info: PersonalInfo = Field(description="Personal information")
    family_info: Optional[List[FamilyMember]] = Field(description="Family information")
    hobbies: Optional[List[str]] = Field(description="Hobbies and interests")
    skills: List[SkillCategoryWithSkills] = Field(description="Skills organized by category")
    welcome_text: str = Field(description="Welcome text for the about page")

class IAboutRepository(ABC):
    """Abstract interface for about data access."""
    
    @abstractmethod
    def get_about_data(self, username: str) -> AboutDomainData:
        """Get about information."""
        pass

class AboutRepository(IAboutRepository):
    """Repository for about endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None, skills_repository: SkillsRepository = None):
        self.data_access = data_access or CSVDataAccess()
        self.skills_repository = skills_repository or SkillsRepository(data_access)
    
    def get_about_data(self, username: str) -> AboutDomainData:
        """Get about information from CSV data."""
        
        profile_data = self.data_access.read_personal_profile(username)
        if not profile_data:
            # Handle case where user profile doesn't exist
            # This could return a default AboutDomainData or raise an error
            # For now, creating a minimal PersonalInfo to avoid crashing
            personal_info = PersonalInfo(full_name="User Not Found", tagline="", designation="", email="", short_summary="")
            return AboutDomainData(
                personal_info=personal_info,
                family_info=None,
                hobbies=None,
                skills=[],
                welcome_text="User not found."
            )

        years_of_experience = self.data_access.calculate_years_of_experience(profile_data['work_start_date'])
        work_experience = self._get_work_experience(username)
        current_company = self._get_current_company(work_experience)
        average_time_in_company = self._calculate_average_time_in_company(work_experience, years_of_experience)
        
        personal_info = PersonalInfo(
            full_name=profile_data.get('full_name'),
            tagline=profile_data.get('tagline'),
            short_summary=profile_data.get('short_summary'),
            long_descriptive_summary=profile_data.get('long_descriptive_summary'),
            designation=profile_data.get('designation'),
            total_years_of_experience=f"{years_of_experience} years",
            current_company=current_company,
            average_time_in_company=average_time_in_company,
            email=profile_data.get('email'),
            dob=profile_data.get('dob'),
            place_of_birth=profile_data.get('place_of_birth'),
            address=f"{profile_data.get('address_city', '')}, {profile_data.get('address_state', '')}, {profile_data.get('address_country', '')}",
            profile_image=profile_data.get('profile_image')
        )
        
        family_members = self.data_access.read_family_info(username)
        family_info = [FamilyMember(**member) for member in family_members] if family_members else None
        
        hobbies_data = self.data_access.read_hobbies(username)
        hobbies = [hobby['hobby_name'] for hobby in hobbies_data]
        
        # Use the Skills repository to get skills organized by category
        skills = self.skills_repository.get_skills_by_category(username)
        
        return AboutDomainData(
            personal_info=personal_info,
            family_info=family_info,
            hobbies=hobbies,
            skills=skills,
            welcome_text="curious_about_me?"
        )

    # The following private methods need to be implemented or adjusted
    def _get_work_experience(self, username: str) -> list:
        # Placeholder
        return []

    def _get_current_company(self, work_experience: list) -> str:
        # Placeholder
        return "Not specified"

    def _calculate_average_time_in_company(self, work_experience: list, total_years: float) -> str:
        # Placeholder
        return "Not specified" 