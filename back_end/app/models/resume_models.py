from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

class Education(BaseModel):
    """Education information for resume."""
    degree: str = Field(description="Degree obtained")
    institution: str = Field(description="Institution name")
    field_of_study: str = Field(description="Field of study")
    start_date: str = Field(description="Start date")
    end_date: str = Field(description="End date")
    gpa: Optional[float] = Field(default=None, description="GPA if available")
    institution_url: Optional[str] = Field(default=None, description="Institution website")

class WorkExperience(BaseModel):
    """Work experience information for resume."""
    company_name: str = Field(description="Company name")
    company_location: str = Field(description="Company location")
    designation: str = Field(description="Job title")
    start_date: str = Field(description="Start date")
    end_date: str = Field(description="End date (or 'Present')")
    company_url: Optional[str] = Field(default=None, description="Company website")

class Project(BaseModel):
    """Project information for resume."""
    title: str = Field(description="Project title")
    short_description: str = Field(description="Brief project description")
    long_description: str = Field(description="Detailed project description")
    project_type: str = Field(description="Type of project")
    status: str = Field(description="Project status")
    start_date: str = Field(description="Start date")
    end_date: Optional[str] = Field(default=None, description="End date")
    role: str = Field(description="Role in the project")
    company: Optional[str] = Field(default=None, description="Company if applicable")
    github_url: Optional[str] = Field(default=None, description="GitHub repository")
    live_url: Optional[str] = Field(default=None, description="Live demo URL")
    hosting_platform: Optional[str] = Field(default=None, description="Hosting platform")
    cicd_pipeline: Optional[str] = Field(default=None, description="CI/CD pipeline")
    monitoring_tracking: Optional[str] = Field(default=None, description="Monitoring and tracking tools")
    skills: Optional[List[str]] = Field(default=None, description="Skills used in the project")

class Skill(BaseModel):
    """Skill information for resume."""
    name: str = Field(description="Skill name")
    rating: float = Field(description="Skill proficiency rating")
    description: str = Field(description="Skill description")
    category: str = Field(description="Skill category")

class Certification(BaseModel):
    """Certification information for resume."""
    name: str = Field(description="Certification name")
    issuing_organization: str = Field(description="Issuing organization")
    issue_date: str = Field(description="Issue date")
    expiry_date: Optional[str] = Field(default=None, description="Expiry date")
    credential_id: Optional[str] = Field(default=None, description="Credential ID")
    credential_url: Optional[str] = Field(default=None, description="Credential URL")

class ResumeData(BaseModel):
    """Complete resume data structure."""
    personal_info: dict = Field(description="Personal information")
    education: List[Education] = Field(description="Education history")
    work_experience: List[WorkExperience] = Field(description="Work experience")
    projects: List[Project] = Field(description="Projects")
    skills: List[Skill] = Field(description="Skills")
    certifications: List[Certification] = Field(description="Certifications")

class ResumeRequest(BaseModel):
    """Request model for resume endpoint."""
    username: str = Field(description="Username for personalization")

class ResumeResponse(BaseModel):
    """Response model for resume endpoint."""
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")
    resume_data: ResumeData = Field(description="Resume data") 