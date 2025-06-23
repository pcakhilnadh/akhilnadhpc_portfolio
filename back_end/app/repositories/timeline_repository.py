from typing import List, Optional
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field
from ..core.config import settings
from ..models.experience_models import Experience, CompanyReference
from ..models.education_models import Education
from .work_experience_repository import WorkExperienceRepository
from .education_repository import EducationRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess

class TimelineDomainData(BaseModel):
    """Domain model for timeline endpoint data."""
    experiences: List[Experience] = Field(description="List of work experiences")
    education: List[Education] = Field(description="List of education entries")
    welcome_text: str = Field(description="Welcome text for the timeline page")

class ITimelineRepository(ABC):
    """Abstract interface for timeline data access."""
    
    @abstractmethod
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline information."""
        pass

class TimelineRepository(ITimelineRepository):
    """Repository for timeline endpoint data - orchestrates education and work experience data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
        self.work_experience_repo = WorkExperienceRepository(data_access)
        self.education_repo = EducationRepository(data_access)
    
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline information by combining education and work experience data."""
        # Get work experience from specialized repository
        experiences = self.work_experience_repo.get_work_experience_data(username)
        
        # Get education from specialized repository
        education = self.education_repo.get_education_data(username)
        
        return TimelineDomainData(
            experiences=experiences,
            education=education,
            welcome_text="where_did_i_start?"
        ) 