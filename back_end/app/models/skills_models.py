from abc import ABC, abstractmethod
from typing import List, Optional
from pydantic import BaseModel, Field


class SkillCategoryBase(BaseModel):
    """Base model for skill category information - baseline data."""
    id: str = Field(description="Skill category ID (e.g., skill_category_001)")
    name: str = Field(description="Skill category name")
    description: str = Field(description="Skill category description")


class SkillCategory(SkillCategoryBase):
    """Extended skill category model - currently same as base but allows future extensions."""
    # Inherited fields: id, name, description
    pass


class SkillBase(BaseModel):
    """Base model for skill information - baseline data."""
    id: str = Field(description="Skill ID (e.g., skill_001)")
    name: str = Field(description="Skill name")
    rating: float = Field(description="Skill rating (1.0-5.0)", ge=1.0, le=5.0)


class Skill(SkillBase):
    """Extended skill model with category information and description."""
    # Inherited fields: id, name, rating
    description: str = Field(description="Skill description")
    category: SkillCategoryBase = Field(description="Skill category information")


class ProjectSkill(BaseModel):
    """Model for project-skill relationship."""
    id: str = Field(description="Project skill relationship ID")
    project_id: str = Field(description="Project ID")
    skill_id: str = Field(description="Skill ID")


class SkillsDomainData(BaseModel):
    """Domain model for skills endpoint data."""
    skills: List[Skill]
    welcome_text: str


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
    @abstractmethod
    def get_skills_data(self, username: str) -> SkillsDomainData:
        pass 