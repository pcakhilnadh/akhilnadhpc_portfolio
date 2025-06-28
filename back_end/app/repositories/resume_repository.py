from typing import List, Optional
from abc import ABC, abstractmethod
from pydantic import BaseModel, Field
from ..models.resume_models import (
    ResumeData, Education, WorkExperience, Project, Skill, Certification
)
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess
from ..core.config import settings


class IResumeRepository(ABC):
    """Abstract interface for resume repository."""
    
    @abstractmethod
    def get_resume_data(self, username: str) -> ResumeData:
        """Get complete resume data for a user."""
        pass


class ResumeRepository(IResumeRepository):
    """Repository for resume data operations."""
    
    def __init__(self, data_access: IPersonalDataAccess = CSVDataAccess()):
        self.data_access = data_access
        self.logger = settings.get_logger("resume_repository")
    
    def get_resume_data(self, username: str) -> ResumeData:
        """Get complete resume data for a user."""
        self.logger.info(f"Fetching resume data for user: {username}")
        
        # Get personal information
        personal_info = self._get_personal_info(username)
        
        # Get education
        education = self._get_education(username)
        
        # Get work experience
        work_experience = self._get_work_experience(username)
        
        # Get projects (with company name resolution)
        projects = self._get_projects(username, work_experience)
        
        # Get skills
        skills = self._get_skills(username)
        
        # Get certifications
        certifications = self._get_certifications(username)
        
        return ResumeData(
            personal_info=personal_info,
            education=education,
            work_experience=work_experience,
            projects=projects,
            skills=skills,
            certifications=certifications
        )
    
    def _get_personal_info(self, username: str) -> dict:
        """Get personal information for resume."""
        profile_data = self.data_access.read_personal_profile(username)
        if not profile_data:
            return {}
        
        return {
            "full_name": profile_data.get('full_name', ''),
            "email": profile_data.get('email', ''),
            "designation": profile_data.get('designation', ''),
            "tagline": profile_data.get('tagline', ''),
            "short_summary": profile_data.get('short_summary', ''),
            "long_descriptive_summary": profile_data.get('long_descriptive_summary', ''),
            "resume_summary": profile_data.get('resume_summary', ''),
            "phone_num": profile_data.get('phone_num', ''),
            "address": f"{profile_data.get('address_city', '')}, {profile_data.get('address_state', '')}, {profile_data.get('address_country', '')}",
            "dob": profile_data.get('dob', ''),
            "place_of_birth": profile_data.get('place_of_birth', ''),
            "work_start_date": profile_data.get('work_start_date', ''),
            "total_years_of_experience": self.data_access.calculate_years_of_experience(profile_data.get('work_start_date', ''))
        }
    
    def _get_education(self, username: str) -> List[Education]:
        """Get education history."""
        education_data = self.data_access.read_education(username)
        education_list = []
        
        for edu in education_data:
            try:
                gpa = float(edu.get('gpa', 0)) if edu.get('gpa') else None
                education_list.append(Education(
                    degree=edu.get('degree', ''),
                    institution=edu.get('institution', ''),
                    field_of_study=edu.get('field_of_study', ''),
                    start_date=edu.get('start_date', ''),
                    end_date=edu.get('end_date', ''),
                    gpa=gpa,
                    institution_url=edu.get('institution_url')
                ))
            except Exception as e:
                self.logger.error(f"Error processing education record: {e}")
                continue
        
        return education_list
    
    def _get_work_experience(self, username: str) -> List[WorkExperience]:
        """Get work experience."""
        work_exp_data = self.data_access.read_work_experience(username)
        work_exp_list = []
        
        for exp in work_exp_data:
            try:
                work_exp_list.append(WorkExperience(
                    company_name=exp.get('company_name', ''),
                    company_location=exp.get('company_location', ''),
                    designation=exp.get('designation', ''),
                    start_date=exp.get('start_date', ''),
                    end_date=exp.get('end_date', 'Present'),
                    company_url=exp.get('company_url')
                ))
            except Exception as e:
                self.logger.error(f"Error processing work experience record: {e}")
                continue
        
        return work_exp_list
    
    def _get_projects(self, username: str, work_experience: List[WorkExperience]) -> List[Project]:
        """Get projects with company name resolution."""
        projects_data = self.data_access.read_projects(username)
        project_skills_data = self.data_access.read_project_skills()
        skills_data = self.data_access.read_skills_data()
        projects_list = []
        
        # Create a mapping of work experience IDs to company names
        work_exp_mapping = {}
        for exp in work_experience:
            # We need to map the work experience ID to company name
            # Since we don't have the ID in the work experience data, we'll use the company name directly
            # This is a workaround - ideally the projects should reference company names directly
            work_exp_mapping[exp.company_name] = exp.company_name
        
        # Create skills mapping for quick lookup
        skills_mapping = {skill['_id']: skill['name'] for skill in skills_data}
        
        # Create project skills mapping
        project_skills_mapping = {}
        for ps in project_skills_data:
            project_id = ps['project_id']
            skill_id = ps['skill_id']
            if project_id not in project_skills_mapping:
                project_skills_mapping[project_id] = []
            if skill_id in skills_mapping:
                project_skills_mapping[project_id].append(skills_mapping[skill_id])
        
        for proj in projects_data:
            try:
                # Get the company name from the work experience mapping
                company_ref = proj.get('company', '')
                company_name = None
                
                # If company field contains work_exp_001, work_exp_002, etc., try to resolve it
                if company_ref.startswith('work_exp_'):
                    # For now, we'll use a simple mapping based on the project data
                    # This is a temporary fix - ideally the CSV should be updated
                    if company_ref == 'work_exp_001':
                        company_name = 'Air India'
                    elif company_ref == 'work_exp_002':
                        company_name = 'NeST Digital'
                    else:
                        company_name = company_ref  # Fallback to the original value
                else:
                    company_name = company_ref
                
                # Get skills for this project
                project_id = proj.get('_id', '')
                project_skills = project_skills_mapping.get(project_id, [])
                
                projects_list.append(Project(
                    title=proj.get('title', ''),
                    short_description=proj.get('short_description', ''),
                    long_description=proj.get('long_description', ''),
                    project_type=proj.get('project_type', ''),
                    status=proj.get('status', ''),
                    start_date=proj.get('start_date', ''),
                    end_date=proj.get('end_date'),
                    role=proj.get('role', ''),
                    company=company_name,
                    github_url=proj.get('github_url'),
                    live_url=proj.get('live_url'),
                    hosting_platform=proj.get('hosting_platform'),
                    cicd_pipeline=proj.get('cicd_pipeline'),
                    monitoring_tracking=proj.get('monitoring_tracking'),
                    skills=project_skills
                ))
            except Exception as e:
                self.logger.error(f"Error processing project record: {e}")
                continue
        
        return projects_list
    
    def _get_skills(self, username: str) -> List[Skill]:
        """Get skills."""
        skills_data = self.data_access.read_skills_data()
        skills_list = []
        
        for skill in skills_data:
            try:
                rating = float(skill.get('rating', 0))
                skills_list.append(Skill(
                    name=skill.get('name', ''),
                    rating=rating,
                    description=skill.get('description', ''),
                    category=skill.get('skill_category_id', '')
                ))
            except Exception as e:
                self.logger.error(f"Error processing skill record: {e}")
                continue
        
        return skills_list
    
    def _get_certifications(self, username: str) -> List[Certification]:
        """Get certifications."""
        certs_data = self.data_access.read_certifications(username)
        certs_list = []
        
        for cert in certs_data:
            try:
                certs_list.append(Certification(
                    name=cert.get('name', ''),
                    issuing_organization=cert.get('issuing_organization', ''),
                    issue_date=cert.get('issue_date', ''),
                    expiry_date=cert.get('expiry_date'),
                    credential_id=cert.get('credential_id'),
                    credential_url=cert.get('credential_url')
                ))
            except Exception as e:
                self.logger.error(f"Error processing certification record: {e}")
                continue
        
        return certs_list 