from abc import ABC, abstractmethod
from typing import Dict, Optional, List


class IPersonalDataAccess(ABC):
    """Abstract interface for personal data access."""
    
    @abstractmethod
    def read_personal_profile(self, username: str) -> Optional[Dict[str, str]]:
        """Read personal profile data."""
        pass
    
    @abstractmethod
    def read_profiles(self, username: str, profile_type: str) -> List[Dict[str, str]]:
        """Read profiles by type (handles all profile types)."""
        pass
    
    @abstractmethod
    def read_family_info(self, username: str) -> List[Dict[str, str]]:
        """Read family information."""
        pass
    
    @abstractmethod
    def read_hobbies(self, username: str) -> List[Dict[str, str]]:
        """Read hobbies information."""
        pass
    
    @abstractmethod
    def calculate_years_of_experience(self, work_start_date_str: str) -> float:
        """Calculate years of experience from work start date."""
        pass
    
    @abstractmethod
    def read_skills_data(self) -> List[Dict[str, str]]:
        """Read all skills data from CSV."""
        pass
    
    @abstractmethod
    def read_education(self, username: str) -> List[Dict[str, str]]:
        """Read education data."""
        pass
    
    @abstractmethod
    def read_work_experience(self, username: str) -> List[Dict[str, str]]:
        """Read work experience data."""
        pass
    
    @abstractmethod
    def read_projects(self, username: str) -> List[Dict[str, str]]:
        """Read projects data."""
        pass
    
    @abstractmethod
    def read_certifications(self, username: str) -> List[Dict[str, str]]:
        """Read certifications data."""
        pass
    
    @abstractmethod
    def read_project_skills(self) -> List[Dict[str, str]]:
        """Read project skills relationship data."""
        pass 