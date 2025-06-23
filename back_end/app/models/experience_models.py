from pydantic import BaseModel, Field
from typing import List, Optional


class CompanyBase(BaseModel):
    """Base model for company information - baseline data."""
    name: str = Field(description="Company name")
    location: str = Field(description="Company location")


class Company(CompanyBase):
    """Extended company model for work experience with full details."""
    id: str = Field(description="Company ID (e.g., work_exp_001)")
    designation: str = Field(description="Job designation at this company")
    company_url: Optional[str] = Field(default=None, description="Company website URL")
    start_date: str = Field(description="Start date at company")
    end_date: Optional[str] = Field(default=None, description="End date at company (null if current)")
    references: Optional[List['CompanyReference']] = Field(default=None, description="Company references")


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