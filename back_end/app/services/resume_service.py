from ..repositories.resume_repository import ResumeRepository, IResumeRepository
from ..models.resume_models import ResumeResponse, ResumeData


class ResumeService:
    """Service for resume endpoint."""
    
    def __init__(self, resume_repo: IResumeRepository = ResumeRepository()):
        self.resume_repo = resume_repo
    
    def get_resume_data(self, username: str) -> ResumeResponse:
        """Get complete resume data for a user."""
        resume_data = self.resume_repo.get_resume_data(username)
        
        return ResumeResponse(
            message="Resume data retrieved successfully",
            resume_data=resume_data
        ) 