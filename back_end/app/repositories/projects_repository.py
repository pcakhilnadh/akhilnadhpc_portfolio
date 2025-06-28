from typing import List, Optional
from ..core.config import settings
from ..models.projects_models import ProjectsDomainData, Project, ProjectBase, IProjectsRepository
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
        """Get basic projects list information."""
        # Read projects from CSV data (basic info only)
        projects = self._get_basic_projects_data(username)
        
        return ProjectsDomainData(
            projects=projects,
            welcome_text="what_have_i_built?"
        )
    
    def get_project_by_id(self, username: str, project_id: str) -> Optional[Project]:
        """Get detailed information for a specific project."""
        try:
            import csv
            import os
            
            # Path to projects CSV file
            projects_path = os.path.join(self.data_access.csv_data_path, "projects", "projects.csv")
            
            with open(projects_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username and row['_id'] == project_id:
                        # Extract ID from _id field (e.g., "project_001" -> 1)
                        project_id_int = int(row.get('_id', '0').replace('project_', '') or 1)
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
                        
                        # Get ML models for this project using the many-to-many relationship
                        ml_models = self.ml_models_repository.get_ml_models_by_project_id(project_id_str)
                        
                        # Get skills for this project
                        skills = self.skills_repository.get_skills_by_project_id(project_id_str)
                        
                        # Get achievements for this project
                        achievements = self.achievements_repository.get_achievements_by_project_id(project_id_str)
                        
                        return Project(
                            id=project_id_int,
                            title=row['title'],
                            short_description=row.get('short_description'),
                            long_description=row.get('long_description'),
                            project_type=row.get('project_type', 'Project'),
                            status=row.get('status', 'Completed'),
                            github_url=row.get('github_url'),
                            live_url=row.get('live_url'),
                            notion_url=row.get('notion_url'),
                            start_date=row.get('start_date'),
                            end_date=row.get('end_date'),
                            role=row.get('role'),
                            company=company_info,
                            ml_models=ml_models if ml_models else None,
                            skills=skills if skills else None,
                            achievements=achievements if achievements else None,
                            hosting_platform=row.get('hosting_platform'),
                            cicd_pipeline=row.get('cicd_pipeline'),
                            monitoring_tracking=row.get('monitoring_tracking')
                        )
            
            return None
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading project {project_id} for {username}: {e}")
            return None
    
    def _get_basic_projects_data(self, username: str) -> List[ProjectBase]:
        """Get basic projects data from CSV (minimal information)."""
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
                        
                        projects.append(
                            ProjectBase(
                                id=project_id,
                                title=row['title'],
                                short_description=row.get('short_description'),
                                project_type=row.get('project_type', 'Project'),
                                status=row.get('status', 'Completed'),
                                github_url=row.get('github_url'),
                                live_url=row.get('live_url'),
                                notion_url=row.get('notion_url'),
                                start_date=row.get('start_date'),
                                end_date=row.get('end_date'),
                                role=row.get('role'),
                                company=company_info
                            )
                        )
            
            return projects
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading projects for {username}: {e}")
            return []
    
    def _get_projects_data(self, username: str) -> List[Project]:
        """Get projects data from CSV (legacy method - now used for detailed view)."""
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
                        
                        # Get ML models for this project using the many-to-many relationship
                        ml_models = self.ml_models_repository.get_ml_models_by_project_id(project_id_str)
                        
                        # Get skills for this project
                        skills = self.skills_repository.get_skills_by_project_id(project_id_str)
                        
                        # Get achievements for this project
                        achievements = self.achievements_repository.get_achievements_by_project_id(project_id_str)
                        
                        projects.append(
                            Project(
                                id=project_id,
                                title=row['title'],
                                short_description=row.get('short_description'),
                                long_description=row.get('long_description'),
                                project_type=row.get('project_type', 'Project'),
                                status=row.get('status', 'Completed'),
                                github_url=row.get('github_url'),
                                live_url=row.get('live_url'),
                                notion_url=row.get('notion_url'),
                                start_date=row.get('start_date'),
                                end_date=row.get('end_date'),
                                role=row.get('role'),
                                company=company_info,
                                ml_models=ml_models if ml_models else None,
                                skills=skills if skills else None,
                                achievements=achievements if achievements else None,
                                hosting_platform=row.get('hosting_platform'),
                                cicd_pipeline=row.get('cicd_pipeline'),
                                monitoring_tracking=row.get('monitoring_tracking')
                            )
                        )
            
            return projects
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading projects for {username}: {e}")
            return [] 