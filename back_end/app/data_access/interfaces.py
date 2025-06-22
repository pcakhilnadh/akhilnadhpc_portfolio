from abc import ABC, abstractmethod
from typing import Dict, Optional, List


class IPersonalDataAccess(ABC):
    """Abstract interface for personal data access."""
    
    @abstractmethod
    def read_personal_profile(self, username: str) -> Optional[Dict[str, str]]:
        """Read personal profile data."""
        pass
    
    @abstractmethod
    def read_social_profiles(self, username: str, profile_type: str) -> List[Dict[str, str]]:
        """Read social profiles by type."""
        pass
    
    @abstractmethod
    def calculate_years_of_experience(self, work_start_date_str: str) -> float:
        """Calculate years of experience from work start date."""
        pass 