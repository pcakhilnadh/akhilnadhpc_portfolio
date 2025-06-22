from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .routers.home import router as home_router
from .routers.about import router as about_router
from .routers.skills import router as skills_router
from .routers.projects import router as projects_router
from .routers.certifications import router as certifications_router
from .routers.timeline import router as timeline_router


class PortfolioAPI:
    """Main API application class following Single Responsibility Principle."""
    
    def __init__(self):
        # Setup logging first
        settings.setup_logging()
        self.logger = settings.get_logger("main")
        
        self.app = self._create_app()
        self._setup_middleware()
        self._setup_routes()
        self._log_startup_info()
    
    def _create_app(self) -> FastAPI:
        """Create FastAPI application instance."""
        self.logger.info("Creating FastAPI application")
        return FastAPI(
            title=settings.api_title,
            version=settings.api_version,
            description=settings.api_description
        )
    
    def _setup_middleware(self):
        """Setup CORS middleware."""
        self.logger.info("Setting up CORS middleware")
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.allowed_origins,
            allow_credentials=settings.allowed_credentials,
            allow_methods=settings.allowed_methods,
            allow_headers=settings.allowed_headers,
        )
    
    def _setup_routes(self):
        """Setup API routes."""
        self.logger.info("Setting up API routes")
        self.app.include_router(home_router)
        self.app.include_router(about_router)
        self.app.include_router(skills_router)
        self.app.include_router(projects_router)
        self.app.include_router(certifications_router)
        self.app.include_router(timeline_router)
        self.logger.info("Routes configured: /, /about, /skills, /projects, /certifications, /timeline")
    
    def _log_startup_info(self):
        """Log startup information."""
        self.logger.info(f"Portfolio API initialized")
        self.logger.info(f"API Title: {settings.api_title}")
        self.logger.info(f"API Version: {settings.api_version}")
        self.logger.info(f"Default Username: {settings.default_username}")
        self.logger.info(f"Log Level: {settings.log_level}")
        if settings.enable_file_logging:
            self.logger.info(f"File Logging: logs/{settings.log_file}")
    
    def get_app(self) -> FastAPI:
        """Get the FastAPI application instance."""
        return self.app


# Create application instance
portfolio_api = PortfolioAPI()
app = portfolio_api.get_app()

if __name__ == "__main__":
    import uvicorn
    
    logger = settings.get_logger("startup")
    logger.info(f"Starting server on {settings.host}:{settings.port}")
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload
    ) 