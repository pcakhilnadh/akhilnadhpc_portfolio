from abc import ABC, abstractmethod
from typing import List, Optional
from pydantic import BaseModel


class Certification(BaseModel):
    id: int
    name: str
    issuer: str
    issue_date: str
    expiry_date: Optional[str] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    skills: List[str]


class CertificationsDomainData(BaseModel):
    certifications: List[Certification]
    welcome_text: str


class ICertificationsRepository(ABC):
    @abstractmethod
    def get_certifications_data(self, username: str) -> CertificationsDomainData:
        pass 