from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from abc import ABC, abstractmethod


class Skill(BaseModel):
    """Model for individual skill."""
    name: str = Field(description="Skill name")
    rating: float = Field(description="Skill rating (1-5)", ge=1, le=5)
    category: str = Field(description="Skill category")
    description: Optional[str] = Field(default=None, description="Skill description")


class SkillCategory(BaseModel):
    """Model for skill category."""
    name: str = Field(description="Category name")
    skills: List[Skill] = Field(description="Skills in this category")


class PersonalInfo(BaseModel):
    """Model for personal information."""
    full_name: str = Field(description="Full name")
    tagline: str = Field(description="Professional tagline")
    short_summary: str = Field(description="Short professional summary")
    long_descriptive_summary: str = Field(description="Detailed biography")
    designation: str = Field(description="Job designation")
    total_years_of_experience: str = Field(description="Years of experience")
    current_company: str = Field(description="Current company name")
    average_time_in_company: str = Field(description="Average time spent in a company")
    email: str = Field(description="Email address")
    dob: str = Field(description="Date of birth")
    place_of_birth: str = Field(description="Place of birth")
    address: str = Field(description="Current address")
    profile_image: Optional[str] = Field(default=None, description="Profile image URL")


class FamilyInfo(BaseModel):
    """Model for family information."""
    father_name: str = Field(description="Father's name")
    father_occupation: str = Field(description="Father's occupation")
    mother_name: str = Field(description="Mother's name")
    mother_occupation: str = Field(description="Mother's occupation")


class AboutDomainData(BaseModel):
    """Domain model for about endpoint data."""
    personal_info: PersonalInfo = Field(description="Personal information")
    family_info: FamilyInfo = Field(description="Family information")
    hobbies: List[str] = Field(description="Hobbies and interests")
    skills: List[SkillCategory] = Field(description="Skills organized by category")
    welcome_text: str = Field(description="Welcome text for the about page")


class AboutResponse(BaseModel):
    """Response model for about endpoint."""
    
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")
    developer: str = Field(description="Developer name")
    technology: str = Field(description="Technology used")
    description: str = Field(description="Project description")
    features: List[str] = Field(description="Key features")
    personal_info: PersonalInfo = Field(description="Personal information")
    family_info: FamilyInfo = Field(description="Family information")
    hobbies: List[str] = Field(description="Hobbies and interests")
    skills: List[SkillCategory] = Field(description="Skills organized by category")
    page_welcome_texts: str = Field(default="who_am_i?", description="Welcome text for the current page")


class IAboutRepository(ABC):
    """Abstract interface for about data access."""
    
    @abstractmethod
    def get_about_data(self, username: str) -> AboutDomainData:
        """Get about information."""
        pass 