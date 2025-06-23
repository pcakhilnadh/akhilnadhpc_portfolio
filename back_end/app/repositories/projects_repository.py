from typing import List
from ..core.config import settings
from ..models.projects_models import ProjectsDomainData, Project, IProjectsRepository
from ..models.experience_models import CompanyBase
from ..models.ml_models import MLModel
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess
from .work_experience_repository import WorkExperienceRepository
from .ml_models_repository import MLModelsRepository
from .skills_repository import SkillsRepository
from .project_achievements_repository import ProjectAchievementsRepository


class ProjectsRepository(IProjectsRepository):
    """Repository for projects endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
        self.work_exp_repository = WorkExperienceRepository(data_access)
        self.ml_models_repository = MLModelsRepository(data_access)
        self.skills_repository = SkillsRepository(data_access)
        self.achievements_repository = ProjectAchievementsRepository(data_access)
    
    def get_projects_data(self, username: str) -> ProjectsDomainData:
        """Get projects information."""
        # Read projects from CSV data
        projects = self._get_projects_data(username)
        
        return ProjectsDomainData(
            projects=projects,
            welcome_text="what_have_i_built?"
        )
    
    def _get_projects_data(self, username: str) -> List[Project]:
        """Get projects data from CSV."""
        try:
            import csv
            import os
            
            # Path to projects CSV file
            projects_path = os.path.join(self.data_access.csv_data_path, "projects", "projects.csv")
            
            projects = []
            with open(projects_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        # Extract ID from _id field (e.g., "project_001" -> 1)
                        project_id = int(row.get('_id', '0').replace('project_', '') or len(projects) + 1)
                        project_id_str = row.get('_id', '')
                        
                        # Resolve company information if it's a work project
                        company_info = None
                        if row.get('project_type') == 'work' and row.get('company'):
                            full_company = self.work_exp_repository.get_company_by_id(username, row['company'])
                            if full_company:
                                # Create base company object with only name and location
                                company_info = CompanyBase(
                                    name=full_company.name,
                                    location=full_company.location
                                )
                        
                        # Resolve ML model information if present
                        ml_model_info = None
                        if row.get('ml_models'):
                            full_ml_model = self.ml_models_repository.get_ml_model_by_id(row['ml_models'])
                            if full_ml_model:
                                # Return the full ML model with training parameters and use cases
                                ml_model_info = full_ml_model
                        
                        # Get skills for this project
                        skills = self.skills_repository.get_skills_by_project_id(project_id_str)
                        
                        # Get achievements for this project
                        achievements = self.achievements_repository.get_achievements_by_project_id(project_id_str)
                        
                        projects.append(
                            Project(
                                id=project_id,
                                title=row['title'],
                                description=row['description'],
                                project_type=row.get('project_type', 'personal'),
                                github_url=row.get('github_url'),
                                live_url=row.get('live_url'),
                                duration=row.get('duration'),
                                start_date=row.get('start_date'),
                                end_date=row.get('end_date'),
                                role=row.get('role'),
                                company=company_info,
                                ml_models=ml_model_info,
                                skills=skills if skills else None,
                                achievements=achievements if achievements else None,
                                deployment=row.get('deployment'),
                                hosting_platform=row.get('hosting_platform'),
                                cicd_pipeline=row.get('cicd_pipeline'),
                                monitoring_tracking=row.get('monitoring_tracking')
                            )
                        )
            
            return projects
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading projects for {username}: {e}")
            return [] 