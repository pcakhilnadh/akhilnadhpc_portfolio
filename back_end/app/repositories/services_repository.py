import pandas as pd
import os
from typing import List, Optional, Protocol
from ..models.services_models import Service, ServicesDomainData, ServiceCategory
from ..data_access.csv_data_access import CSVDataAccess
from ..core.config import settings


class IServicesRepository(Protocol):
    """Interface for services repository."""
    
    def get_services_data(self, username: str) -> ServicesDomainData:
        """Get all services data."""
        ...
    
    def get_service_by_id(self, username: str, service_id: int) -> Optional[Service]:
        """Get service by ID."""
        ...
    
    def get_services_by_category(self, username: str, category: str) -> List[Service]:
        """Get services by category."""
        ...


class ServicesRepository:
    """Repository for services data access."""
    
    def __init__(self):
        self.csv_data_access = CSVDataAccess()
        self.services_file = os.path.join(self.csv_data_access.csv_data_path, "services", "services.csv")
    
    def _load_services_data(self) -> pd.DataFrame:
        """Load services data from CSV."""
        try:
            return pd.read_csv(self.services_file)
        except FileNotFoundError:
            settings.get_logger("services").error(f"Services CSV file not found: {self.services_file}")
            return pd.DataFrame()
        except Exception as e:
            settings.get_logger("services").error(f"Error loading services data: {e}")
            return pd.DataFrame()
    
    def _parse_features(self, features_str: str) -> List[str]:
        """Parse features from semicolon-separated string."""
        if pd.isna(features_str) or not features_str:
            return []
        return [feature.strip() for feature in features_str.split(';') if feature.strip()]
    
    def _dataframe_to_service(self, row: pd.Series) -> Service:
        """Convert DataFrame row to Service model."""
        service_id = int(row['id'])
        features = self._parse_features(row['features'])
        
        return Service(
            id=service_id,
            title=row['title'],
            description=row['description'],
            category=ServiceCategory(row['category']),
            email=row['email'],
            icon_name=row['icon_name'],
            gradient=row['gradient'],
            features=features
        )
    
    def get_services_data(self, username: str) -> ServicesDomainData:
        """
        Get all services data.
        
        Args:
            username (str): Username for personalization (not used in current implementation)
            
        Returns:
            ServicesDomainData: Complete services data with categories
        """
        services_df = self._load_services_data()
        
        if services_df.empty:
            settings.get_logger("services").warning("No services data found")
            return ServicesDomainData(
                services=[],
                categories=[],
                total_services=0
            )
        
        # Convert DataFrame to Service models
        services = []
        for _, row in services_df.iterrows():
            service = self._dataframe_to_service(row)
            services.append(service)
        
        # Get unique categories
        categories = list(set(service.category.value for service in services))
        categories.sort()  # Sort for consistent ordering
        
        return ServicesDomainData(
            services=services,
            categories=categories,
            total_services=len(services)
        )
    
    def get_service_by_id(self, username: str, service_id: int) -> Optional[Service]:
        """
        Get service by ID.
        
        Args:
            username (str): Username for personalization (not used in current implementation)
            service_id (int): ID of the service to retrieve
            
        Returns:
            Optional[Service]: Service if found, None otherwise
        """
        services_df = self._load_services_data()
        
        if services_df.empty:
            return None
        
        service_row = services_df[services_df['id'] == service_id]
        
        if service_row.empty:
            return None
        
        return self._dataframe_to_service(service_row.iloc[0])
    
    def get_services_by_category(self, username: str, category: str) -> List[Service]:
        """
        Get services by category.
        
        Args:
            username (str): Username for personalization (not used in current implementation)
            category (str): Category to filter by
            
        Returns:
            List[Service]: List of services in the specified category
        """
        services_df = self._load_services_data()
        
        if services_df.empty:
            return []
        
        category_services = services_df[services_df['category'] == category]
        
        services = []
        for _, row in category_services.iterrows():
            service = self._dataframe_to_service(row)
            services.append(service)
        
        return services 