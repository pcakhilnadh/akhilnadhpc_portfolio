from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class ServiceCategory(str, Enum):
    """Service categories enumeration."""
    AI_ML = "AI/ML"
    DEVELOPMENT = "Development"
    CONSULTING = "Consulting"


class Service(BaseModel):
    """Model for individual service."""
    id: int
    title: str
    description: str
    category: ServiceCategory
    email: str
    icon_name: str
    gradient: str
    features: List[str] = []


class ServicesDomainData(BaseModel):
    """Domain model for services data."""
    services: List[Service]
    categories: List[str]
    total_services: int


class ServiceDetailResponse(BaseModel):
    """Response model for service detail endpoint."""
    success: bool
    message: str
    service: Optional[Service] = None 