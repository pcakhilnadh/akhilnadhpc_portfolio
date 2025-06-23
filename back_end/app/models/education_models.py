from pydantic import BaseModel, Field
from typing import Optional


class Education(BaseModel):
    """Model for individual education entry."""
    id: str = Field(description="Education ID")
    degree: str = Field(description="Degree name")
    institution: str = Field(description="Institution name")
    institution_url: Optional[str] = Field(default=None, description="Institution website URL")
    field_of_study: str = Field(description="Field of study")
    start_date: str = Field(description="Start date")
    end_date: str = Field(description="End date")
    gpa: Optional[float] = Field(default=None, description="GPA score") 