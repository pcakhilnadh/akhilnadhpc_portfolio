from pydantic import BaseModel, Field
from typing import List, Optional
from abc import ABC, abstractmethod


class CompanyReference(BaseModel):
    """Model for company reference person."""
    id: str = Field(description="Reference ID")
    name: str = Field(description="Reference person name")
    designation: str = Field(description="Reference person designation")
    email: str = Field(description="Reference person email")
    phone: str = Field(description="Reference person phone")
    linkedin_url: Optional[str] = Field(default=None, description="Reference person LinkedIn URL")
    relationship: str = Field(description="Relationship to the employee")


class Experience(BaseModel):
    """Model for individual experience entry."""
    id: int = Field(description="Experience ID")
    title: str = Field(description="Job title")
    company: str = Field(description="Company name")
    company_url: Optional[str] = Field(default=None, description="Company website URL")
    start_date: str = Field(description="Start date")
    end_date: Optional[str] = Field(default=None, description="End date (null if current)")
    references: Optional[List[CompanyReference]] = Field(default=None, description="Company references")


class Education(BaseModel):
    """Model for individual education entry."""
    id: str = Field(description="Education ID")
    degree: str = Field(description="Degree name")
    institution: str = Field(description="Institution name")
    institution_url: Optional[str] = Field(default=None, description="Institution website URL")
    field_of_study: str = Field(description="Field of study")
    start_date: str = Field(description="Start date")
    end_date: str = Field(description="End date")
    gpa: Optional[float] = Field(default=None, description="GPA score")


class TimelineDomainData(BaseModel):
    """Domain model for timeline endpoint data."""
    experiences: List[Experience] = Field(description="List of work experiences")
    education: List[Education] = Field(description="List of education entries")
    welcome_text: str = Field(description="Welcome text for the timeline page")


class TimelineResponse(BaseModel):
    """Response model for timeline endpoint."""
    
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")
    developer: str = Field(description="Developer name")
    technology: str = Field(description="Technology used")
    description: str = Field(description="Project description")
    features: List[str] = Field(description="Key features")
    experiences: List[Experience] = Field(description="List of work experiences")
    page_welcome_texts: str = Field(default="where_did_i_start?", description="Welcome text for the current page")


class ITimelineRepository(ABC):
    """Abstract interface for timeline data access."""
    
    @abstractmethod
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline information."""
        pass 