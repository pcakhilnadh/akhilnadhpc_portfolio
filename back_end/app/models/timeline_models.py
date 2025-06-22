from pydantic import BaseModel, Field
from typing import List, Optional
from abc import ABC, abstractmethod


class Experience(BaseModel):
    """Model for individual experience entry."""
    id: int = Field(description="Experience ID")
    title: str = Field(description="Job title")
    company: str = Field(description="Company name")
    start_date: str = Field(description="Start date")
    end_date: Optional[str] = Field(default=None, description="End date (null if current)")
    description: str = Field(description="Job description")
    technologies: Optional[List[str]] = Field(default=None, description="Technologies used")
    achievements: Optional[List[str]] = Field(default=None, description="Key achievements")


class TimelineDomainData(BaseModel):
    """Domain model for timeline endpoint data."""
    experiences: List[Experience] = Field(description="List of work experiences")
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