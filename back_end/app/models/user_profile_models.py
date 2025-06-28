from pydantic import BaseModel, Field, computed_field
from typing import List, Dict, Optional
from datetime import datetime, date

class Profile(BaseModel):
    """Model for a single social or professional profile link."""
    url: str = Field(description="Profile URL")
    handler: str = Field(description="Profile handler/username")

class PersonalInfo(BaseModel):
    """Canonical model for all personal information about the user."""
    full_name: str = Field(description="Full name")
    tagline: str = Field(description="Professional tagline")
    designation: str = Field(description="Job designation")
    email: str = Field(description="Email address")
    profile_image: Optional[str] = Field(default=None, description="Profile image URL")
    short_summary: str = Field(description="A short, one-sentence professional summary")
    long_descriptive_summary: Optional[str] = Field(default=None, description="A longer, more detailed biography or summary")
    total_years_of_experience: Optional[str] = Field(default=None, description="Total years of professional experience")
    current_company: Optional[str] = Field(default=None, description="Current company name")
    average_time_in_company: Optional[str] = Field(default=None, description="Average time spent in a company")
    dob: Optional[str] = Field(default=None, description="Date of birth")
    place_of_birth: Optional[str] = Field(default=None, description="Place of birth")
    address: Optional[str] = Field(default=None, description="Current address")
    resume_summary: Optional[str] = Field(default=None, description="Resume-specific professional summary")
    phone_num: Optional[str] = Field(default=None, description="Phone number")

class FamilyMember(BaseModel):
    """Model for an individual family member."""
    relationship: str = Field(description="Relationship to the person")
    full_name: str = Field(description="Full name of the family member")
    occupation: str = Field(description="Occupation of the family member")
    dob: Optional[str] = Field(default=None, description="Date of birth of the family member (YYYY-MM-DD)")
    profile_url: Optional[str] = Field(default=None, description="Profile URL or image of the family member")
    
    @computed_field
    @property
    def age(self) -> Optional[int]:
        """Calculate age from date of birth."""
        if not self.dob:
            return None
        
        try:
            birth_date = datetime.strptime(self.dob, '%Y-%m-%d').date()
            today = date.today()
            age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
            return age
        except (ValueError, TypeError):
            return None

class UserProfile(BaseModel):
    """The complete user profile, composing all related personal information."""
    personal_info: PersonalInfo = Field(description="Core personal information")
    social_profiles: Dict[str, Profile] = Field(description="Social media profiles (e.g., Twitter, LinkedIn)")
    professional_profiles: Dict[str, Profile] = Field(description="Professional profiles (e.g., GitHub, Kaggle)")
    coding_profiles: Dict[str, Profile] = Field(description="Coding platform profiles (e.g., LeetCode, HackerRank)")
    personal_profiles: Dict[str, Profile] = Field(description="Other personal profiles or websites")
    family_info: Optional[List[FamilyMember]] = Field(default=None, description="A list of family members")
    hobbies: Optional[List[str]] = Field(default=None, description="A list of hobbies and interests") 