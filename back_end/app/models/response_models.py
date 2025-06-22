from pydantic import BaseModel, Field
from typing import Dict, Optional


class BaseResponse(BaseModel):
    """Base response model for API responses."""
    
    success: bool = Field(default=True, description="Indicates if the request was successful")
    message: str = Field(description="Response message")


class ErrorResponse(BaseResponse):
    """Response model for error cases."""
    
    success: bool = Field(default=False, description="Indicates if the request was successful")
    error_code: Optional[str] = Field(default=None, description="Error code if applicable")
    details: Optional[Dict] = Field(default=None, description="Additional error details") 