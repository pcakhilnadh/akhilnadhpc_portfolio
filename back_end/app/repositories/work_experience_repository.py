from typing import List, Optional
from ..models.experience_models import Experience, CompanyReference, Company
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class WorkExperienceRepository:
    """Repository for work experience data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def _normalize_end_date(self, end_date: str) -> Optional[str]:
        """Normalize end_date to handle blank values and 'Present' as None (current employment)."""
        if not end_date or end_date.strip() == '' or end_date.strip().lower() == 'present':
            return None
        return end_date.strip()
    
    def get_company_by_id(self, username: str, company_id: str) -> Optional[Company]:
        """Get company information by ID."""
        try:
            import csv
            import os
            
            # Path to work experience CSV file
            work_exp_path = os.path.join(self.data_access.csv_data_path, "work_experience", "work_experience.csv")
            
            with open(work_exp_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username and row['_id'] == company_id:
                        # Get references for this company
                        ref_ids = row.get('references', '').split(',') if row.get('references') else []
                        ref_ids = [ref_id.strip() for ref_id in ref_ids if ref_id.strip()]
                        
                        # Get company references
                        company_references = self._get_company_references(username)
                        company_refs = [ref for ref in company_references if ref.id in ref_ids]
                        
                        return Company(
                            id=row['_id'],
                            name=row['company_name'],
                            location=row['company_location'],
                            designation=row['designation'],
                            company_url=row.get('company_url'),
                            start_date=row['start_date'],
                            end_date=self._normalize_end_date(row.get('end_date', '')),
                            references=company_refs if company_refs else None
                        )
            
            return None
            
        except Exception as e:
            self.data_access.logger.error(f"Error getting company by ID {company_id} for {username}: {e}")
            return None
    
    def get_work_experience_data(self, username: str) -> List[Experience]:
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
                                end_date=self._normalize_end_date(row.get('end_date', '')),
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