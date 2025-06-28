from typing import List
from ..core.config import settings
from ..models.certifications_models import CertificationsDomainData, Certification, ICertificationsRepository
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class CertificationsRepository(ICertificationsRepository):
    """Repository for certifications endpoint data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_certifications_data(self, username: str) -> CertificationsDomainData:
        """Get certifications information."""
        # Read certifications from CSV data
        certifications = self._get_certifications_data(username)
        
        return CertificationsDomainData(
            certifications=certifications,
            welcome_text="proof_of_skills?"
        )
    
    def _get_certifications_data(self, username: str) -> List[Certification]:
        """Get certifications data from CSV."""
        try:
            import csv
            import os
            
            # Path to certifications CSV file
            certifications_path = os.path.join(self.data_access.csv_data_path, "certifications", "certifications.csv")
            
            certifications = []
            with open(certifications_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['username'] == username:
                        # Get skills for this certification using the certification_skills relationship
                        skills = self._get_certification_skills(row['_id'])
                        
                        certifications.append(
                            Certification(
                                id=int(row.get('_id', '').replace('cert_', '')),
                                name=row['name'],
                                issuer=row['issuer'],
                                issue_date=row['issue_date'],
                                expiry_date=row.get('expiry_date'),
                                credential_id=row.get('credential_id'),
                                credential_url=row.get('credential_url'),
                                skills=skills
                            )
                        )
            
            return certifications
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading certifications for {username}: {e}")
            return []
    
    def _get_certification_skills(self, certification_id: str) -> List[str]:
        """Get skills associated with a certification."""
        try:
            import csv
            import os
            
            # Path to certification skills CSV file
            cert_skills_path = os.path.join(self.data_access.csv_data_path, "certifications", "certification_skills.csv")
            
            skill_ids = []
            with open(cert_skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['certification_id'] == certification_id:
                        skill_ids.append(row['skill_id'])
            
            # Get skill names from skill IDs
            skill_names = self._get_skill_names_by_ids(skill_ids)
            return skill_names
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading certification skills for {certification_id}: {e}")
            return []
    
    def _get_skill_names_by_ids(self, skill_ids: List[str]) -> List[str]:
        """Get skill names from skill IDs."""
        try:
            import csv
            import os
            
            # Path to skills CSV file
            skills_path = os.path.join(self.data_access.csv_data_path, "skills", "skills.csv")
            
            skill_names = []
            with open(skills_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['_id'] in skill_ids:
                        skill_names.append(row['name'])
            
            return skill_names
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading skill names for IDs {skill_ids}: {e}")
            return [] 