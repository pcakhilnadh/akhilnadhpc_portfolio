from typing import List
from ..core.config import settings
from ..models.skills_models import SkillsDomainData, Skill, ISkillsRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class SkillsRepository(ISkillsRepository):
    """Repository for skills endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_skills_data(self, username: str) -> SkillsDomainData:
        """Get skills information."""
        # Read skills from CSV data
        skills = self._get_skills_by_category(username)
        
        return SkillsDomainData(
            skills=skills,
            welcome_text="what_can_i_do?"
        )
    
    def _get_skills_by_category(self, username: str) -> List[Skill]:
        """Get skills organized by category from CSV."""
        try:
            import csv
            import os
            
            # Paths to CSV files
            categories_path = os.path.join(self.data_access.csv_data_path, "skills", "skill_categories.csv")
            skills_path = os.path.join(self.data_access.csv_data_path, "skills", "skills.csv")
            
            # Read skill categories
            categories = {}
            with open(categories_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    categories[row['_id']] = row['name']
            
            # Read skills and convert to Skill objects
            skills = []
            with open(skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        category_id = row['skill_category_id']
                        category_name = categories.get(category_id, "Other")
                        
                        skills.append(
                            Skill(
                                id=int(row.get('_id', len(skills) + 1)),
                                name=row['name'],
                                level=int(float(row['rating']) * 20),  # Convert 1-5 rating to 0-100
                                category=category_name
                            )
                        )
            
            return skills
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading skills for {username}: {e}")
            return [] 