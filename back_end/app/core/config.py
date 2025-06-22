from pydantic_settings import BaseSettings
from typing import List
import logging
import sys
from pathlib import Path


class Settings(BaseSettings):
    """Configuration settings for the Portfolio API following Single Responsibility Principle."""
    
    # API Configuration
    api_title: str = "Akhilnadhpc Portfolio API"
    api_version: str = "1.0.0"
    api_description: str = "A modern portfolio API built with FastAPI"
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True
    
    # CORS Configuration
    allowed_origins: List[str] = ["http://localhost:5000"]
    allowed_credentials: bool = True
    allowed_methods: List[str] = ["*"]
    allowed_headers: List[str] = ["*"]
    
    # Default Values
    default_username: str = "akhilnadhpc"
    
    # Logging Configuration
    log_level: str = "INFO"
    log_format: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    log_file: str = "portfolio_api.log"
    enable_file_logging: bool = False
    
    class Config:
        env_file = ".env"
    
    def setup_logging(self) -> None:
        """
        Setup logging configuration based on settings.
        
        Configures both console and file logging (if enabled) with the specified log level.
        """
        # Get log level from settings
        log_level = getattr(logging, self.log_level.upper(), logging.INFO)
        
        # Create logger
        logger = logging.getLogger("portfolio_api")
        logger.setLevel(log_level)
        
        # Clear any existing handlers
        logger.handlers.clear()
        
        # Create formatter
        formatter = logging.Formatter(self.log_format)
        
        # Console handler (always enabled)
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(log_level)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
        
        # File handler (if enabled)
        if self.enable_file_logging:
            # Create logs directory if it doesn't exist
            log_dir = Path("logs")
            log_dir.mkdir(exist_ok=True)
            
            # Create file handler
            file_handler = logging.FileHandler(log_dir / self.log_file)
            file_handler.setLevel(log_level)
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)
        
        # Set logging level for other loggers
        logging.getLogger("uvicorn").setLevel(log_level)
        logging.getLogger("uvicorn.access").setLevel(log_level)
        logging.getLogger("fastapi").setLevel(log_level)
        
        logger.info(f"Logging configured with level: {self.log_level}")
        if self.enable_file_logging:
            logger.info(f"File logging enabled: logs/{self.log_file}")
    
    def get_logger(self, name: str = None) -> logging.Logger:
        """
        Get a logger instance.
        
        Args:
            name (str): Logger name. If None, returns the main portfolio_api logger.
            
        Returns:
            logging.Logger: Configured logger instance.
        """
        if name is None:
            return logging.getLogger("portfolio_api")
        return logging.getLogger(f"portfolio_api.{name}")


# Global settings instance
settings = Settings() 