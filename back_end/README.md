# Portfolio API Backend

A modern, scalable FastAPI backend for the portfolio application built with SOLID principles and Clean Architecture.

## 🏗️ Architecture & Design Patterns

The backend follows **Clean Architecture** principles with complete separation of concerns and implements several key design patterns:

### Layered Architecture
```
back_end/app/
├── core/                 # Configuration and cross-cutting concerns
├── models/              # Data models (entity-based, not endpoint-based)
├── repositories/        # Data access layer with composition pattern
├── services/           # Business logic layer
├── routers/            # API endpoints (thin controllers)
└── data_access/        # Abstracted data access layer
```

### SOLID Principles Implementation

1. **Single Responsibility Principle (SRP)**
   - Each class has one reason to change
   - `PortfolioAPI` handles only application setup
   - Repositories handle only data access for their domain
   - Services handle only business logic

2. **Open/Closed Principle (OCP)**
   - New data sources can be added without modifying existing code
   - New endpoints can be added by implementing interfaces
   - Extensible through inheritance and composition

3. **Liskov Substitution Principle (LSP)**
   - All repository implementations can be substituted for their interfaces
   - `CSVDataAccess` can be replaced with `DatabaseDataAccess` without breaking code

4. **Interface Segregation Principle (ISP)**
   - `IPersonalDataAccess` provides only necessary methods
   - Repository interfaces are specific to their domains
   - No fat interfaces forcing unnecessary dependencies

5. **Dependency Inversion Principle (DIP)**
   - High-level modules (services) depend on abstractions (interfaces)
   - Low-level modules (repositories) implement abstractions
   - Dependencies flow toward abstractions, not concretions

### Key Design Patterns

- **Repository Pattern**: Abstract data access layer with domain-specific repositories
- **Dependency Injection**: FastAPI's built-in DI container for loose coupling
- **Composition over Inheritance**: `ProjectsRepository` composes other repositories
- **Factory Pattern**: `PortfolioAPI` creates and configures the application
- **Strategy Pattern**: Different data access strategies (CSV, future database)
- **Facade Pattern**: Repositories provide simplified interfaces to complex data operations

### Data Model Architecture

The models follow a sophisticated **entity-based** design with inheritance for API optimization:

- **Entity-Based Naming**: Files named after data entities (`projects_models.py`, `user_profile_models.py`)
- **Base Models**: Lean models for API responses (`CompanyBase`, `SkillBase`)
- **Full Models**: Rich internal models with all data (`Company`, `Skill`)
- **Inheritance Pattern**: `Company` inherits from `CompanyBase` for clean separation
- **Composition**: Complex models compose simpler ones (`Project` contains `CompanyBase`)

#### Composition for Complex Objects
```python
class Project(BaseModel):
    id: str
    title: str
    description: str
    company: Optional[CompanyBase]  # Composed from WorkExperienceRepository
    skills: List[SkillBase]         # Composed from SkillsRepository
    ml_model: Optional[MLModelBase] # Composed from MLModelsRepository
```

### Model Categories

The models layer contains the following files in the `models/` directory:

1. **Entity Models**: Core data structures for each domain
   - `user_profile_models.py`: User profile and personal information models
   - `experience_models.py`: Work experience and company models
   - `projects_models.py`: Project information and related models
   - `skills_models.py`: Skills, categories, and proficiency models
   - `certifications_models.py`: Professional certification models
   - `education_models.py`: Educational background models
   - `ml_models.py`: Machine learning model specifications
   - `project_achievements_models.py`: Project accomplishment models

2. **Response Models**: API response structures
   - `response_models.py`: All API endpoint response models

### Model Design Patterns

- **Base Models**: Lean versions for API responses (e.g., `CompanyBase`, `SkillBase`)
- **Full Models**: Rich internal models with complete data (e.g., `Company`, `Skill`)
- **Inheritance**: Full models inherit from base models for consistency
- **Composition**: Complex models compose simpler ones for relationships

### Benefits of This Architecture

- **API Efficiency**: Base models provide lean, focused API responses
- **Internal Richness**: Full models maintain complete data relationships
- **Maintainability**: Single source of truth for each entity
- **Extensibility**: Easy to add new fields without breaking API contracts
- **Type Safety**: Pydantic validation ensures data integrity
- **Documentation**: Auto-generated API docs from model definitions

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd back_end
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python -m uvicorn app.main:app --reload
   ```

   Or using the module directly:
   ```bash
   python -m app.main
   ```

### Alternative Commands

**Development with auto-reload:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Production mode:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📡 API Endpoints

### Base URL
```
http://localhost:8000
```

### Available Endpoints

| Method | Endpoint | Description | Request Body | Response Model |
|--------|----------|-------------|--------------|----------------|
| POST | `/` | Home page data | `{"username": "string"}` | `HomeResponse` |
| POST | `/about` | About information | `{"username": "string"}` | `AboutResponse` |
| POST | `/skills` | Skills data | `{"username": "string"}` | `SkillsResponse` |
| POST | `/projects` | Projects data | `{"username": "string"}` | `ProjectsResponse` |
| POST | `/certifications` | Certifications data | `{"username": "string"}` | `CertificationsResponse` |
| POST | `/timeline` | Timeline/Experience data | `{"username": "string"}` | `TimelineResponse` |
| GET | `/docs` | Interactive API docs | - | - |
| GET | `/redoc` | Alternative API docs | - | - |

### Example Requests

**Home endpoint:**
```bash
curl -X POST http://localhost:8000/ \
  -H "Content-Type: application/json" \
  -d '{"username": "akhilnadhpc"}'
```

**About endpoint:**
```bash
curl -X POST http://localhost:8000/about \
  -H "Content-Type: application/json" \
  -d '{"username": "akhilnadhpc"}'
```

**Skills endpoint:**
```bash
curl -X POST http://localhost:8000/skills \
  -H "Content-Type: application/json" \
  -d '{"username": "akhilnadhpc"}'
```

## 🏛️ Project Structure

### Core Components

- **`core/config.py`**: Application configuration and logging setup using Pydantic Settings
- **`models/`**: Data models (entity-based architecture)
  - `user_profile_models.py`: User profile and personal information models
  - `experience_models.py`: Work experience and company models
  - `projects_models.py`: Project information and related models
  - `skills_models.py`: Skills, categories, and proficiency models
  - `certifications_models.py`: Professional certification models
  - `education_models.py`: Educational background models
  - `ml_models.py`: Machine learning model specifications
  - `project_achievements_models.py`: Project accomplishment models
  - `response_models.py`: API response models for all endpoints
- **`repositories/`**: Data access layer with composition pattern
  - `home_repository.py`: Home data access with user profile aggregation
  - `about_repository.py`: About data access with personal info
  - `skills_repository.py`: Skills data access
  - `projects_repository.py`: Projects data access (composes other repositories)
  - `certifications_repository.py`: Certifications data access
  - `timeline_repository.py`: Timeline data access
  - `work_experience_repository.py`: Work experience data access
  - `ml_models_repository.py`: ML models data access
  - `project_achievements_repository.py`: Project achievements data access
- **`services/`**: Business logic layer
  - `home_service.py`: Home business logic
  - `about_service.py`: About business logic
  - `skills_service.py`: Skills business logic
  - `projects_service.py`: Projects business logic
  - `certifications_service.py`: Certifications business logic
  - `timeline_service.py`: Timeline business logic
- **`routers/`**: API endpoints (thin controllers)
  - `home.py`: Home endpoint (`/`)
  - `about.py`: About endpoint (`/about`)
  - `skills.py`: Skills endpoint (`/skills`)
  - `projects.py`: Projects endpoint (`/projects`)
  - `certifications.py`: Certifications endpoint (`/certifications`)
  - `timeline.py`: Timeline endpoint (`/timeline`)
- **`data_access/`**: Abstracted data access layer
  - `csv_data_access.py`: CSV file operations implementation
  - `interfaces.py`: Data access interfaces (IPersonalDataAccess)

### Key Features

- ✅ **Clean Architecture**: Strict separation of concerns with dependency inversion
- ✅ **SOLID Principles**: All five SOLID principles properly implemented
- ✅ **Type Safety**: Full type hints with Pydantic models and validation
- ✅ **Dependency Injection**: FastAPI's built-in DI container for loose coupling
- ✅ **Repository Pattern**: Abstract data access with domain-specific repositories
- ✅ **Composition Pattern**: Complex repositories compose simpler ones
- ✅ **Entity-Based Models**: Models named after data entities, not endpoints
- ✅ **Inheritance for API Optimization**: Base models for lean API responses
- ✅ **API Documentation**: Auto-generated with FastAPI and OpenAPI
- ✅ **CORS Support**: Configured for cross-origin requests
- ✅ **Environment Configuration**: Support for `.env` files with Pydantic Settings
- ✅ **Integrated Logging**: Object-oriented logging configuration
- ✅ **CSV Data Source**: Structured data from CSV files with abstraction
- ✅ **Error Handling**: Graceful fallbacks for missing data
- ✅ **No Circular Imports**: Clean dependency graph maintained

## 📊 Data Models Architecture

### Model Design Philosophy

The data models follow a sophisticated design that balances internal richness with API efficiency:

#### Entity-Based Organization
- **Files named after data entities**: All model files reflect the core data entities they represent
- **Single responsibility**: Each model file focuses on one domain area
- **Single source of truth**: Each data entity has one canonical model file

#### Inheritance for API Optimization
```python
# Base model for API responses (lean)
class CompanyBase(BaseModel):
    name: str
    location: str

# Full model for internal use (rich)
class Company(CompanyBase):
    id: str
    designation: str
    references: List[str]
    # ... additional fields
```

#### Composition for Complex Objects
```python
class Project(BaseModel):
    id: str
    title: str
    description: str
    company: Optional[CompanyBase]  # Composed from WorkExperienceRepository
    skills: List[SkillBase]         # Composed from SkillsRepository
    ml_model: Optional[MLModelBase] # Composed from MLModelsRepository
```

### Model Categories

1. **Core Entity Models**: Define the main data structures
   - `UserProfile`: Complete user information
   - `Project`: Project details with relationships
   - `Skill`: Skills with categories
   - `Experience`: Work experience timeline

2. **Base Models**: Lean versions for API responses
   - `CompanyBase`: Essential company info
   - `SkillBase`: Core skill information
   - `MLModelBase`: Key ML model details

3. **Response Models**: API-specific response structures
   - `HomeResponse`: Home page API response
   - `AboutResponse`: About page API response
   - `PageResponse`: Common page metadata

4. **Data Models**: Data structures for different endpoints
   - `AboutDomainData`: About page data structure (co-located in `about_repository.py`)
   - `HomeDomainData`: Home page data structure (co-located in `home_repository.py`)
   - `TimelineDomainData`: Timeline page data structure (co-located in `timeline_repository.py`)
   - `SkillsDomainData`: Skills page data structure (in `skills_models.py`)
   - `ProjectsDomainData`: Projects page data structure (in `projects_models.py`)
   - `CertificationsDomainData`: Certifications page data structure (in `certifications_models.py`)

### Benefits of This Architecture

- **API Efficiency**: Base models provide lean, focused API responses
- **Internal Richness**: Full models maintain complete data relationships
- **Maintainability**: Single source of truth for each entity
- **Extensibility**: Easy to add new fields without breaking API contracts
- **Type Safety**: Pydantic validation ensures data integrity
- **Documentation**: Auto-generated API docs from model definitions

## 🔧 Configuration

The application uses Pydantic Settings for configuration. Key settings in `core/config.py`:

### API Configuration
- `api_title`: API title
- `api_version`: API version
- `default_username`: Default username for endpoints

### Server Configuration
- `host`: Server host (default: 0.0.0.0)
- `port`: Server port (default: 8000)

### CORS Configuration
- `allowed_origins`: List of allowed origins for CORS
- `frontend_url`: Frontend URL for CORS configuration

### Logging Configuration
- `log_level`: Log level (DEBUG, INFO, WARNING, ERROR, CRITICAL) - default: INFO
- `log_format`: Log message format
- `log_file`: Log file name (default: portfolio_api.log)
- `enable_file_logging`: Enable file logging (default: False)

### Environment Variables

You can override any setting using environment variables or a `.env` file:

```bash
# .env file example
LOG_LEVEL=DEBUG
ENABLE_FILE_LOGGING=true
DEFAULT_USERNAME=your_username
FRONTEND_URL=http://localhost:5173
```

## 📊 Data Structure

The application uses CSV files for data storage with the following structure:

```
csv_data/
├── personal/
│   ├── personal_profiles.csv      # Basic user information
│   ├── family_members.csv         # Family information
│   ├── hobbies.csv               # Hobbies and interests
│   └── social_profiles.csv       # Social media profiles
├── skills/
│   ├── skills.csv                # Individual skills
│   └── skill_categories.csv      # Skill categories
├── projects/
│   ├── projects.csv              # Project information
│   ├── project_skills.csv        # Skills used in projects
│   └── project_achievements.csv  # Project achievements
├── certifications/
│   ├── certifications.csv        # Certification details
│   └── certification_skills.csv  # Skills covered by certifications
└── work_experience/
    ├── work_experience.csv       # Work history
    └── work_experience_projects.csv # Projects at work
```

## 📝 Logging

The application includes comprehensive logging with the following features:

### Log Levels
- **DEBUG**: Detailed information for debugging
- **INFO**: General information about application flow
- **WARNING**: Warning messages for potential issues
- **ERROR**: Error messages for handled exceptions
- **CRITICAL**: Critical errors that may cause application failure

### Log Output
- **Console**: All log messages are output to console
- **File**: Optional file logging to `logs/portfolio_api.log`

### Usage in Code
```python
from app.core.config import settings

logger = settings.get_logger("module_name")
logger.info("Information message")
logger.debug("Debug message")
logger.warning("Warning message")
logger.error("Error message")
```

## 📚 API Documentation

Once the server is running, visit:
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## 🧪 Testing

The modular architecture makes testing straightforward:

```bash
# Run tests (when implemented)
pytest

# Test specific endpoint
pytest tests/test_home.py
pytest tests/test_about.py
```

## 🚀 Deployment

### Docker (Recommended)
```bash
docker build -t portfolio-api .
docker run -p 8000:8000 portfolio-api
```

### Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📝 Adding New Endpoints

1. Create models in `models/`
2. Create repository in `repositories/`
3. Create service in `services/`
4. Create router in `routers/`
5. Include router in `main.py`

Example structure for new endpoint `/new-feature`:
```
models/new_feature_models.py
repositories/new_feature_repository.py
services/new_feature_service.py
routers/new_feature.py
```

## 🔄 Recent Updates

### v3.0.0 - Architecture Refactoring & Model Consolidation
- ✅ **Entity-Based Model Organization**: Organized model files by data entities, not page endpoints
- ✅ **Model Consolidation**: Consolidated user data into `user_profile_models.py`
- ✅ **Clean Model Layer**: Removed page-specific models and focused on core data entities
- ✅ **Repository Data Models**: Moved domain-specific data structures to their respective repositories
- ✅ **Import Cleanup**: Fixed all broken imports after model reorganization
- ✅ **Consistent HTTP Methods**: Standardized all endpoints to use POST with username parameter
- ✅ **No Circular Imports**: Maintained clean dependency graph throughout refactoring
- ✅ **Enhanced Documentation**: Updated README to accurately reflect current model architecture

### v2.0.0 - Complete API Overhaul
- ✅ **POST-based APIs**: All endpoints now use POST with username in request body
- ✅ **Profile Image Support**: Added profile image support to home and about endpoints
- ✅ **Welcome Text System**: Dynamic welcome texts for each page
- ✅ **New Endpoints**: Added Skills, Projects, Certifications, and Timeline endpoints
- ✅ **CORS Configuration**: Proper CORS setup for frontend integration
- ✅ **Error Handling**: Improved error handling with graceful fallbacks
- ✅ **Data Access Layer**: Abstracted CSV data operations

### v1.0.0 - Initial Release
- ✅ **Clean Architecture**: SOLID principles implementation
- ✅ **FastAPI Backend**: Modern Python web framework
- ✅ **Type Safety**: Full Pydantic model integration
- ✅ **Modular Design**: Separated concerns with dedicated layers

## 🤝 Contributing

1. **Follow Architecture Patterns**: Maintain the layered architecture (routers → services → repositories → data_access)
2. **Model Organization**: Use entity-based naming for model files (e.g., `user_profile_models.py`, `skills_models.py`)
3. **Repository Co-location**: Consider co-locating data models with their repositories when appropriate
4. **Type Safety**: Add proper type hints and Pydantic validation
5. **Documentation**: Include docstrings for all functions and classes
6. **Logging**: Add appropriate logging for debugging and monitoring
7. **Testing**: Write tests for new functionality
8. **Import Management**: Ensure no circular imports and clean dependency graph

## 📄 License

This project is part of the portfolio application.