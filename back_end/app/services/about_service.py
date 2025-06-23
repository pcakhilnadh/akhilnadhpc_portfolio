from ..repositories.about_repository import AboutDomainData, IAboutRepository


class AboutService:
    """Service for about endpoint business logic."""
    
    def __init__(self, repository: IAboutRepository):
        self.repository = repository
    
    def get_about_data(self, username: str) -> AboutDomainData:
        """
        Get about data through repository.
        
        Args:
            username (str): Username for personalization
            
        Returns:
            AboutDomainData: Domain model with about information
        """
        return self.repository.get_about_data(username) 