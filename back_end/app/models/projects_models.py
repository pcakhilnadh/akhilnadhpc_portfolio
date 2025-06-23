from abc import ABC, abstractmethod
from typing import List, Optional
from pydantic import BaseModel
from .experience_models import CompanyBase
from .ml_models import MLModel
from .skills_models import SkillBase
from .project_achievements_models import ProjectAchievementBase


class Project(BaseModel):
    id: int
    title: str
    description: str
    project_type: str  # work or personal
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    duration: Optional[str] = None
    start_date: Optional[str] = None  # ISO format: YYYY-MM-DD
    end_date: Optional[str] = None    # ISO format: YYYY-MM-DD
    role: Optional[str] = None
    company: Optional[CompanyBase] = None
    ml_models: Optional[MLModel] = None
    skills: Optional[List[SkillBase]] = None
    achievements: Optional[List[ProjectAchievementBase]] = None
    deployment: Optional[str] = None
    hosting_platform: Optional[str] = None
    cicd_pipeline: Optional[str] = None
    monitoring_tracking: Optional[str] = None


class ProjectsDomainData(BaseModel):
    projects: List[Project]
    welcome_text: str


class IProjectsRepository(ABC):
    @abstractmethod
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        pass 