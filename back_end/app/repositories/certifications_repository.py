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
                        # Parse skills string to list
                        skills = row.get('skills', '').split(',') if row.get('skills') else []
                        skills = [skill.strip() for skill in skills if skill.strip()]
                        
                        certifications.append(
                            Certification(
                                id=int(row.get('id', len(certifications) + 1)),
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