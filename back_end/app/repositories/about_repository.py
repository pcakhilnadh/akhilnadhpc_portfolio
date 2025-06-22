from ..models.about_models import AboutDomainData, IAboutRepository, PersonalInfo, FamilyInfo, SkillCategory, Skill
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess
from ..core.config import settings


class AboutRepository(IAboutRepository):
    """Repository for about endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_about_data(self, username: str) -> AboutDomainData:
        """Get about information from CSV data."""
        
        # Get personal profile data
        profile_data = self.data_access.read_personal_profile(username)
        
        if not profile_data:
            # Return default data if user not found
            return self._get_default_about_data()
        
        # Calculate years of experience
        years_of_experience = self.data_access.calculate_years_of_experience(
            profile_data['work_start_date']
        )
        
        # Get work experience data for current company and average time calculation
        work_experience = self._get_work_experience(username)
        current_company = self._get_current_company(work_experience)
        average_time_in_company = self._calculate_average_time_in_company(work_experience, years_of_experience)
        
        # Personal Information from CSV
        personal_info = PersonalInfo(
            full_name=profile_data['full_name'],
            tagline=profile_data['tagline'],
            short_summary=profile_data['short_summary'],
            long_descriptive_summary=profile_data['long_descriptive_summary'],
            designation=profile_data['tagline'].split(' at ')[0] if ' at ' in profile_data['tagline'] else profile_data['tagline'],
            total_years_of_experience=f"{years_of_experience} years",
            current_company=current_company,
            average_time_in_company=average_time_in_company,
            email=profile_data['email'],
            dob=profile_data['dob'],
            place_of_birth=profile_data['place_of_birth'],
            address=f"{profile_data['address_city']}, {profile_data['address_state']}, {profile_data['address_country']}",
            profile_image=profile_data['profile_image']
        )
        
        # Family Information from CSV
        family_info = self._get_family_info(username)
        
        # Hobbies from CSV
        hobbies = self._get_hobbies(username)
        
        # Skills from CSV
        skills = self._get_skills_by_category()
        
        return AboutDomainData(
            personal_info=personal_info,
            family_info=family_info,
            hobbies=hobbies,
            skills=skills,
            welcome_text="curious_about_me?"
        )
    
    def _get_family_info(self, username: str) -> FamilyInfo:
        """Get family information from CSV."""
        family_members_path = self.data_access.csv_data_path + "/personal/family_members.csv"
        
        try:
            import csv
            with open(family_members_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                father_name = ""
                father_occupation = ""
                mother_name = ""
                mother_occupation = ""
                
                for row in reader:
                    if row['personal_profile_id'] == username:
                        if row['relationship'].lower() == 'father':
                            father_name = row['name']
                            father_occupation = row['occupation']
                        elif row['relationship'].lower() == 'mother':
                            mother_name = row['name']
                            mother_occupation = row['occupation']
                
                return FamilyInfo(
                    father_name=father_name or "Not specified",
                    father_occupation=father_occupation or "Not specified",
                    mother_name=mother_name or "Not specified",
                    mother_occupation=mother_occupation or "Not specified"
                )
        except Exception as e:
            self.data_access.logger.error(f"Error reading family info for {username}: {e}")
            return FamilyInfo(
                father_name="Not specified",
                father_occupation="Not specified",
                mother_name="Not specified",
                mother_occupation="Not specified"
            )
    
    def _get_hobbies(self, username: str) -> list[str]:
        """Get hobbies from CSV."""
        hobbies_path = self.data_access.csv_data_path + "/personal/hobbies.csv"
        
        try:
            import csv
            hobbies = []
            with open(hobbies_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['personal_profile_id'] == username:
                        hobbies.append(row['hobby'])
            return hobbies
        except Exception as e:
            self.data_access.logger.error(f"Error reading hobbies for {username}: {e}")
            return ["Coding", "Reading", "Gaming"]
    
    def _get_skills_by_category(self) -> list[SkillCategory]:
        """Get skills organized by category from CSV."""
        skills_path = self.data_access.csv_data_path + "/skills/skills.csv"
        categories_path = self.data_access.csv_data_path + "/skills/skill_categories.csv"
        
        try:
            import csv
            
            # Read skill categories
            categories = {}
            with open(categories_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    categories[row['_id']] = row['name']
            
            # Read skills and group by category
            skills_by_category = {}
            with open(skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    category_id = row['skill_category_id']
                    category_name = categories.get(category_id, "Other")
                    
                    if category_name not in skills_by_category:
                        skills_by_category[category_name] = []
                    
                    skills_by_category[category_name].append(
                        Skill(
                            name=row['name'],
                            rating=float(row['rating']),
                            category=category_name
                        )
                    )
            
            # Convert to SkillCategory objects
            skill_categories = []
            for category_name, skills in skills_by_category.items():
                skill_categories.append(
                    SkillCategory(
                        name=category_name,
                        skills=skills
                    )
                )
            
            return skill_categories
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading skills: {e}")
            return []
    
    def _get_default_about_data(self) -> AboutDomainData:
        """Get default about data when user is not found."""
        return AboutDomainData(
            personal_info=PersonalInfo(
                full_name="Default User",
                tagline="Default Tagline",
                short_summary="Default summary",
                long_descriptive_summary="Default long description",
                designation="Default Role",
                total_years_of_experience="0 years",
                current_company="Not specified",
                average_time_in_company="0 years",
                email="default@example.com",
                dob="1990-01-01",
                place_of_birth="Default Location",
                address="Default Address",
                profile_image=""
            ),
            family_info=FamilyInfo(
                father_name="Not specified",
                father_occupation="Not specified",
                mother_name="Not specified",
                mother_occupation="Not specified"
            ),
            hobbies=["Coding", "Reading", "Gaming"],
            skills=[],
            welcome_text="curious_about_me?"
        )
    
    def _get_work_experience(self, username: str) -> list[dict]:
        """Get work experience data from CSV."""
        work_exp_path = self.data_access.csv_data_path + "/work_experience/work_experience.csv"
        
        try:
            import csv
            work_experience = []
            with open(work_exp_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        work_experience.append(row)
            return work_experience
        except Exception as e:
            self.data_access.logger.error(f"Error reading work experience for {username}: {e}")
            return []
    
    def _get_current_company(self, work_experience: list[dict]) -> str:
        """Get current company name from work experience."""
        if not work_experience:
            return "Not specified"
        
        # Find the most recent job (end_date = "Present" or latest date)
        current_job = None
        for job in work_experience:
            if job['end_date'].lower() == 'present':
                current_job = job
                break
        
        if current_job:
            return current_job['company_name']
        
        # If no "Present" job, find the latest by date
        try:
            from datetime import datetime
            latest_job = max(work_experience, key=lambda x: datetime.strptime(x['end_date'], '%Y-%m') if x['end_date'].lower() != 'present' else datetime.now())
            return latest_job['company_name']
        except:
            return work_experience[0]['company_name'] if work_experience else "Not specified"
    
    def _calculate_average_time_in_company(self, work_experience: list[dict], total_years: int) -> str:
        """Calculate average time spent in a company based on experience till last company."""
        
        if not work_experience or len(work_experience) <= 1:
            return f"{total_years} years"
        
        try:
            from datetime import datetime
            
            # Separate current company from previous companies
            current_company_jobs = []
            previous_company_jobs = []
            
            for job in work_experience:
                if job['end_date'].strip().lower() == 'present':
                    current_company_jobs.append(job)
                else:
                    previous_company_jobs.append(job)
            
            # If no previous companies, return total experience
            if not previous_company_jobs:
                return f"{total_years} years"
            
            # Calculate experience till current company (excluding current company)
            experience_till_current_months = 0
            for job in previous_company_jobs:
                # Strip whitespace and parse dates
                start_date_str = job['start_date'].strip()
                end_date_str = job['end_date'].strip()
                
                start_date = datetime.strptime(start_date_str, '%Y-%m')
                end_date = datetime.strptime(end_date_str, '%Y-%m')
                
                # Calculate months difference more accurately
                years_diff = end_date.year - start_date.year
                months_diff = end_date.month - start_date.month
                total_months = years_diff * 12 + months_diff
                
                # Add 1 month if we completed at least part of the end month
                if end_date.month >= start_date.month or years_diff > 0:
                    total_months += 1
                
                experience_till_current_months += total_months
            
            # Calculate average: Experience Till Current Company / (Number of Previous Companies)
            num_previous_companies = len(previous_company_jobs)
            
            # Calculate average months spent in previous companies
            avg_months = experience_till_current_months / num_previous_companies
            avg_years = avg_months / 12
            
            if avg_years >= 1:
                result = f"{avg_years:.1f} years"
            else:
                result = f"{avg_months:.0f} months"
            
            return result
                
        except Exception as e:
            self.data_access.logger.error(f"Error calculating average time in company: {e}")
            return f"{total_years} years" 