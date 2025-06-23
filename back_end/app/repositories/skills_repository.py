from typing import List, Optional
from ..core.config import settings
from ..models.skills_models import SkillsDomainData, Skill, ISkillsRepository, SkillBase, SkillCategory, SkillCategoryBase
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class SkillsRepository(ISkillsRepository):
    """Repository for skills data with categories and project relationships."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_skills_data(self, username: str) -> SkillsDomainData:
        """Get all skills information with category details."""
        # For this implementation, username is not used, but it's part of the interface
        skills = self._get_all_skills()
        return SkillsDomainData(
            skills=skills,
            welcome_text="what_can_i_do?"
        )

    def get_skill_by_id(self, skill_id: str) -> Optional[Skill]:
        """Get skill information by ID with category details."""
        try:
            import csv
            import os
            
            skills_path = os.path.join(self.data_access.csv_data_path, "skills", "skills.csv")
            
            with open(skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['_id'] == skill_id:
                        category = self._get_skill_category_by_id(row['skill_category_id'])
                        if category:
                            return Skill(
                                id=row['_id'],
                                name=row['name'],
                                rating=float(row['rating']),
                                description=row['description'],
                                category=category
                            )
            return None
        except Exception as e:
            settings.get_logger(__name__).error(f"Error getting skill by ID {skill_id}: {e}")
            return None
    
    def get_skills_by_project_id(self, project_id: str) -> List[SkillBase]:
        """Get simplified skills for a specific project."""
        skill_ids = self._get_skill_ids_for_project(project_id)
        if not skill_ids:
            return []
        
        all_skills = self._get_all_skills(id_filter=skill_ids)
        return [SkillBase(id=s.id, name=s.name, rating=s.rating) for s in all_skills]
    
    def _get_all_skills(self, id_filter: Optional[List[str]] = None) -> List[Skill]:
        """Read skills from CSV, optionally filtering by a list of IDs."""
        try:
            import csv
            import os
            
            skills_path = os.path.join(self.data_access.csv_data_path, "skills", "skills.csv")
            categories = {cat.id: cat for cat in self._get_all_skill_categories()}
            skills = []
            
            with open(skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if id_filter and row['_id'] not in id_filter:
                        continue
                    
                    category = categories.get(row['skill_category_id'])
                    if category:
                        skills.append(
                            Skill(
                                id=row['_id'],
                                name=row['name'],
                                rating=float(row['rating']),
                                description=row['description'],
                                category=category
                            )
                        )
            return skills
        except Exception as e:
            settings.get_logger(__name__).error(f"Error reading skills data: {e}")
            return []

    def _get_skill_category_by_id(self, category_id: str) -> Optional[SkillCategoryBase]:
        """Get skill category by ID."""
        all_categories = self._get_all_skill_categories()
        return next((cat for cat in all_categories if cat.id == category_id), None)

    def _get_all_skill_categories(self) -> List[SkillCategoryBase]:
        """Get all skill categories."""
        try:
            import csv
            import os
            
            categories_path = os.path.join(self.data_access.csv_data_path, "skills", "skill_categories.csv")
            categories = []
            with open(categories_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    categories.append(
                        SkillCategoryBase(
                            id=row['_id'],
                            name=row['name'],
                            description=row['description']
                        )
                    )
            return categories
        except Exception as e:
            settings.get_logger(__name__).error(f"Error getting skill categories: {e}")
            return []

    def _get_skill_ids_for_project(self, project_id: str) -> List[str]:
        """Get skill IDs associated with a project."""
        try:
            import csv
            import os
            
            project_skills_path = os.path.join(self.data_access.csv_data_path, "projects", "project_skills.csv")
            skill_ids = []
            with open(project_skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['project_id'] == project_id:
                        skill_ids.append(row['skill_id'])
            return skill_ids
        except Exception as e:
            settings.get_logger(__name__).error(f"Error getting skill IDs for project {project_id}: {e}")
            return [] 