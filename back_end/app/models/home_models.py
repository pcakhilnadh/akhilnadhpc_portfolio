from pydantic import BaseModel, Field
from typing import Dict
from abc import ABC, abstractmethod


class BasicInfo(BaseModel):
    """Basic information model for personal data."""
    
    full_name: str = Field(description="Full name of the person")
    tagline: str = Field(description="Professional tagline")
    short_summary: str = Field(description="Short professional summary")
    designation: str = Field(description="Current designation/role")
    total_years_of_experiece: str = Field(description="Total years of experience")
    email: str = Field(description="Email address")
    profile_image: str = Field(description="Profile image URL")
    


class Profile(BaseModel):
    """Profile model for social/professional profiles."""
    
    url: str = Field(description="Profile URL")
    handler: str = Field(description="Profile handler/username")


class PersonalData(BaseModel):
    """Personal data model containing all profile information."""
    
    basic_info: BasicInfo = Field(description="Basic personal information")
    social_profiles: Dict[str, Profile] = Field(description="Social media profiles")
    professional_profiles: Dict[str, Profile] = Field(description="Professional profiles")
    coding_profiles: Dict[str, Profile] = Field(description="Coding platform profiles")
    personal_profiles: Dict[str, Profile] = Field(description="Personal profiles")


class HomeDomainData(BaseModel):
    """Domain model for home endpoint data."""
    
    username: str = Field(description="Username")
    message: str = Field(description="Welcome message")
    status: str = Field(description="API status")
    version: str = Field(description="API version")


class HomeResponse(BaseModel):
    """Response model for home endpoint."""
    
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")
    status: str = Field(description="API status")
    version: str = Field(description="API version")
    endpoints: Dict[str, str] = Field(description="Available API endpoints")
    personal_data: PersonalData = Field(description="Personal data for the portfolio")
    page_welcome_texts: str = Field(default="who_am_i?", description="Welcome text for the current page")


class IHomeRepository(ABC):
    """Abstract interface for home data access."""
    
    @abstractmethod
    def get_home_info(self, username: str) -> HomeDomainData:
        """Get home information."""
        pass
    
    @abstractmethod
    def get_endpoints_info(self) -> Dict[str, str]:
        """Get available endpoints."""
        pass 