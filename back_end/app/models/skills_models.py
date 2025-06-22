from pydantic import BaseModel, Field
from typing import List
from abc import ABC, abstractmethod


class Skill(BaseModel):
    """Model for individual skill."""
    id: int = Field(description="Skill ID")
    name: str = Field(description="Skill name")
    level: int = Field(description="Skill level (0-100)", ge=0, le=100)
    category: str = Field(description="Skill category")


class SkillsDomainData(BaseModel):
    """Domain model for skills endpoint data."""
    skills: List[Skill] = Field(description="List of skills")
    welcome_text: str = Field(description="Welcome text for the skills page")


class SkillsResponse(BaseModel):
    """Response model for skills endpoint."""
    
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")
    developer: str = Field(description="Developer name")
    technology: str = Field(description="Technology used")
    description: str = Field(description="Project description")
    features: List[str] = Field(description="Key features")
    skills: List[Skill] = Field(description="List of skills")
    page_welcome_texts: str = Field(default="what_can_i_do?", description="Welcome text for the current page")


class ISkillsRepository(ABC):
    """Abstract interface for skills data access."""
    
    @abstractmethod
    def get_skills_data(self, username: str) -> SkillsDomainData:
        """Get skills information."""
        pass 