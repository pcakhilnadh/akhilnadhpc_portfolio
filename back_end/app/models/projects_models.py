from abc import ABC, abstractmethod
from typing import List, Optional
from pydantic import BaseModel


class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    category: str
    completion_date: Optional[str] = None


class ProjectsDomainData(BaseModel):
    projects: List[Project]
    welcome_text: str


class IProjectsRepository(ABC):
    @abstractmethod
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        pass 