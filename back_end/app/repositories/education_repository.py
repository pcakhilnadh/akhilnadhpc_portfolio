from typing import List
from ..models.education_models import Education
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class EducationRepository:
    """Repository for education data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_education_data(self, username: str) -> List[Education]:
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