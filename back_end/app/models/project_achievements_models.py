from pydantic import BaseModel, Field
from typing import List, Optional


class ProjectAchievementBase(BaseModel):
    """Base model for project achievement information - baseline data."""
    id: str = Field(description="Achievement ID (e.g., achievement_001)")
    achievement_title: str = Field(description="Title of the achievement")


class ProjectAchievement(ProjectAchievementBase):
    """Extended project achievement model with full details."""
    # Inherited fields: id, achievement_title
    achievement_description: str = Field(description="Detailed description of the achievement") 