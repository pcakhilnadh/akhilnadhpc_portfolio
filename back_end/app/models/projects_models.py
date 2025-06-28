from abc import ABC, abstractmethod
from typing import List, Optional
from enum import Enum
from datetime import datetime, date
from pydantic import BaseModel, Field, computed_field
from .experience_models import CompanyBase
from .ml_models import MLModel
from .skills_models import SkillBase
from .project_achievements_models import ProjectAchievementBase


class ProjectType(str, Enum):
    """Enum for project types."""
    POC = "POC"
    MVP = "MVP"
    DATA_ANALYSIS = "Data Analysis"
    RESEARCH = "Research"
    MODEL_BUILDING = "Model Building"
    ALGORITHM_DEVELOPMENT = "Algorithm Development"
    CONSULTATION = "Consultation"
    PROJECT = "Project"


class ProjectStatus(str, Enum):
    """Enum for project status."""
    COMPLETED = "Completed"
    ON_HOLD = "On Hold"
    IN_PROGRESS = "In Progress"
    NOT_STARTED = "Not Started"
    CANCELLED = "Cancelled"


class ProjectMLModel(BaseModel):
    """Model for project-ML model relationship."""
    id: str = Field(description="Project-ML model relationship ID")
    project_id: str = Field(description="Project ID")
    ml_model_id: str = Field(description="ML Model ID")
    model_role: str = Field(description="Role of the model in the project (e.g., primary, secondary)")
    model_version: str = Field(description="Version of the model used")


class ProjectBase(BaseModel):
    """Base model for project information - minimal data for list view."""
    id: str
    title: str
    short_description: Optional[str] = None
    project_type: ProjectType
    status: ProjectStatus
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    notion_url: Optional[str] = None
    start_date: Optional[str] = None  # ISO format: YYYY-MM-DD
    end_date: Optional[str] = None    # ISO format: YYYY-MM-DD
    role: Optional[str] = None
    company: Optional[CompanyBase] = None

    @computed_field
    @property
    def duration(self) -> Optional[str]:
        """Calculate duration from start_date and end_date."""
        if not self.start_date:
            return None
        
        try:
            start = datetime.strptime(self.start_date, "%Y-%m-%d").date()
            
            if not self.end_date:
                # Ongoing project - calculate from start to today
                end = date.today()
            else:
                end = datetime.strptime(self.end_date, "%Y-%m-%d").date()
            
            # Calculate difference
            delta = end - start
            days = delta.days
            
            if days < 30:
                return f"{days} days"
            elif days < 365:
                months = days // 30
                return f"{months} month{'s' if months != 1 else ''}"
            else:
                years = days // 365
                months = (days % 365) // 30
                if months > 0:
                    return f"{years} year{'s' if years != 1 else ''} {months} month{'s' if months != 1 else ''}"
                else:
                    return f"{years} year{'s' if years != 1 else ''}"
                    
        except (ValueError, TypeError):
            return None


class Project(ProjectBase):
    """Extended project model with full details."""
    # Inherited fields: id, title, short_description, project_type, status, github_url, live_url, notion_url, start_date, end_date, role, company, duration (computed)
    long_description: Optional[str] = None
    ml_models: Optional[List[MLModel]] = None
    skills: Optional[List[SkillBase]] = None
    achievements: Optional[List[ProjectAchievementBase]] = None
    hosting_platform: Optional[str] = None
    cicd_pipeline: Optional[str] = None
    monitoring_tracking: Optional[str] = None


class ProjectsDomainData(BaseModel):
    projects: List[ProjectBase]
    welcome_text: str


class ProjectDetailResponse(BaseModel):
    """Response model for detailed project information."""
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")
    project: Project = Field(description="Detailed project information")


class IProjectsRepository(ABC):
    @abstractmethod
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        pass
    
    @abstractmethod
    def get_project_by_id(self, username: str, project_id: str) -> Optional[Project]:
        """Get detailed information for a specific project."""
        pass 