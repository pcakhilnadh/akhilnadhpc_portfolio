from pydantic import BaseModel, Field
from typing import Dict, Optional, List, Any
from .user_profile_models import UserProfile, PersonalInfo, FamilyMember
from .skills_models import SkillCategory
from .experience_models import Experience


class BaseResponse(BaseModel):
    """Base response model for API responses."""
    
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")


class ErrorResponse(BaseResponse):
    """Response model for error cases."""
    
    success: bool = Field(default=False, description="Indicates if the request was successful")
    error_code: Optional[str] = Field(default=None, description="Error code if applicable")
    details: Optional[Dict] = Field(default=None, description="Additional error details")


class PageResponse(BaseResponse):
    """Base response model for page endpoints with common metadata."""
    
    developer: str = Field(description="Developer name")
    technology: str = Field(description="Technology used")
    description: str = Field(description="Project description")
    features: List[str] = Field(description="Key features")
    page_welcome_texts: str = Field(description="Welcome text for the current page")


class TimelineResponse(PageResponse):
    """Response model for timeline endpoint."""
    
    experiences: List[Experience] = Field(description="List of work experiences")
    page_welcome_texts: str = Field(default="where_did_i_start?", description="Welcome text for the current page")


class HomeResponse(BaseResponse):
    """Response model for home endpoint."""
    
    status: str = Field(description="API status")
    version: str = Field(description="API version")
    endpoints: Dict[str, str] = Field(description="Available API endpoints")
    personal_data: UserProfile = Field(description="The complete user profile data")
    page_welcome_texts: str = Field(default="who_am_i?", description="Welcome text for the current page")


class AboutResponse(PageResponse):
    """Response model for about endpoint."""
    personal_info: PersonalInfo = Field(description="Personal information")
    family_info: Optional[List[FamilyMember]] = Field(description="Family information")
    hobbies: Optional[List[str]] = Field(description="Hobbies and interests")
    skills: List[SkillCategory] = Field(description="Skills organized by category")
    page_welcome_texts: str = Field(default="who_am_i?", description="Welcome text for the current page") 