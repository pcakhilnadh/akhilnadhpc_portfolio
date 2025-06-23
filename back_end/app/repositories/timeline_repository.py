from typing import List
from ..core.config import settings
from ..models.timeline_models import TimelineDomainData, Experience, Education, CompanyReference, ITimelineRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class TimelineRepository(ITimelineRepository):
    """Repository for timeline endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_timeline_data(self, username: str) -> TimelineDomainData:
        """Get timeline information."""
        # Read work experience from CSV data
        experiences = self._get_work_experience_data(username)
        
        # Read education from CSV data
        education = self._get_education_data(username)
        
        return TimelineDomainData(
            experiences=experiences,
            education=education,
            welcome_text="where_did_i_start?"
        )
    
    def _get_work_experience_data(self, username: str) -> List[Experience]:
        """Get work experience data from CSV."""
        try:
            import csv
            import os
            
            # Path to work experience CSV file
            work_exp_path = os.path.join(self.data_access.csv_data_path, "work_experience", "work_experience.csv")
            
            # Get company references for this user
            company_references = self._get_company_references(username)
            
            experiences = []
            with open(work_exp_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        # Get references for this work experience
                        ref_ids = row.get('references', '').split(',') if row.get('references') else []
                        ref_ids = [ref_id.strip() for ref_id in ref_ids if ref_id.strip()]
                        
                        # Filter references for this company
                        company_refs = [ref for ref in company_references if ref.id in ref_ids]
                        
                        experiences.append(
                            Experience(
                                id=int(row.get('_id', '').replace('work_exp_', '')),
                                title=row['designation'],
                                company=row['company_name'],
                                company_url=row.get('company_url'),
                                start_date=row['start_date'],
                                end_date=row.get('end_date') if row.get('end_date') != 'Present' else None,
                                references=company_refs if company_refs else None
                            )
                        )
            
            # Sort by start date (most recent first)
            experiences.sort(key=lambda x: x.start_date, reverse=True)
            
            return experiences
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading work experience for {username}: {e}")
            return []
    
    def _get_company_references(self, username: str) -> List[CompanyReference]:
        """Get company references data from CSV."""
        try:
            import csv
            import os
            
            # Path to company references CSV file
            refs_path = os.path.join(self.data_access.csv_data_path, "work_experience", "company_references.csv")
            
            references = []
            with open(refs_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        references.append(
                            CompanyReference(
                                id=row['_id'],
                                name=row['reference_name'],
                                designation=row['designation'],
                                email=row['email'],
                                phone=row['phone'],
                                linkedin_url=row.get('linkedin_url'),
                                relationship=row['relationship']
                            )
                        )
            
            return references
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading company references for {username}: {e}")
            return []
    
    def _get_education_data(self, username: str) -> List[Education]:
        """Get education data from CSV."""
        try:
            import csv
            import os
            
            # Path to education CSV file
            education_path = os.path.join(self.data_access.csv_data_path, "personal", "education.csv")
            
            education_entries = []
            with open(education_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['personal_profile_id'] == username:
                        # Convert GPA to float if it exists
                        gpa = None
                        if row.get('gpa'):
                            try:
                                gpa = float(row['gpa'])
                            except ValueError:
                                gpa = None
                        
                        education_entries.append(
                            Education(
                                id=row['_id'],
                                degree=row['degree'],
                                institution=row['institution'],
                                institution_url=row.get('institution_url'),
                                field_of_study=row['field_of_study'],
                                start_date=row['start_date'],
                                end_date=row['end_date'],
                                gpa=gpa
                            )
                        )
            
            # Sort by start date (most recent first)
            education_entries.sort(key=lambda x: x.start_date, reverse=True)
            
            return education_entries
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading education for {username}: {e}")
            return [] 