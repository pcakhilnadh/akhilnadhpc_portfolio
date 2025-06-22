# Portfolio API Backend

A modern, scalable FastAPI backend for the portfolio application built with SOLID principles and Clean Architecture.

## 🏗️ Architecture

The backend follows Clean Architecture principles with complete separation of concerns:

```
back_end/app/
├── core/                 # Configuration and core utilities
├── models/              # Data models (domain + API responses)
├── repositories/        # Data access layer
├── services/           # Business logic layer
├── routers/            # API endpoints
└── data_access/        # CSV data access layer
```

### Design Patterns
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Repository Pattern**: Abstract data access layer
- **Dependency Injection**: FastAPI's built-in DI container
- **Clean Architecture**: Separation of domain logic from infrastructure
- **Data Access Layer**: Abstracted CSV data operations

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

All endpoints use POST method with username in request body for consistency and security.

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/home` | Home page data | `{"username": "string"}` |
| POST | `/about` | About information | `{"username": "string"}` |
| POST | `/skills` | Skills data | `{"username": "string"}` |
| POST | `/projects` | Projects data | `{"username": "string"}` |
| POST | `/certifications` | Certifications data | `{"username": "string"}` |
| POST | `/timeline` | Timeline/Experience data | `{"username": "string"}` |
| GET | `/docs` | Interactive API docs | - |
| GET | `/redoc` | Alternative API docs | - |

### Example Requests

**Home endpoint:**
```bash
curl -X POST http://localhost:8000/home \
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
- **`models/`**: Data models separated by endpoint
  - `home_models.py`: Home endpoint models with profile image support
  - `about_models.py`: About endpoint models with personal info, family, hobbies
  - `skills_models.py`: Skills endpoint models with categorized skills
  - `projects_models.py`: Projects endpoint models with project details
  - `certifications_models.py`: Certifications endpoint models
  - `timeline_models.py`: Timeline/Experience endpoint models
  - `response_models.py`: Common API response models
- **`repositories/`**: Data access layer
  - `home_repository.py`: Home data access with profile image
  - `about_repository.py`: About data access with personal info
  - `skills_repository.py`: Skills data access
  - `projects_repository.py`: Projects data access
  - `certifications_repository.py`: Certifications data access
  - `timeline_repository.py`: Timeline data access
- **`services/`**: Business logic layer
  - `home_service.py`: Home business logic
  - `about_service.py`: About business logic
  - `skills_service.py`: Skills business logic
  - `projects_service.py`: Projects business logic
  - `certifications_service.py`: Certifications business logic
  - `timeline_service.py`: Timeline business logic
- **`routers/`**: API endpoints
  - `home.py`: Home endpoint (`/home`)
  - `about.py`: About endpoint (`/about`)
  - `skills.py`: Skills endpoint (`/skills`)
  - `projects.py`: Projects endpoint (`/projects`)
  - `certifications.py`: Certifications endpoint (`/certifications`)
  - `timeline.py`: Timeline endpoint (`/timeline`)
- **`data_access/`**: CSV data access layer
  - `csv_data_access.py`: CSV file operations
  - `interfaces.py`: Data access interfaces

### Key Features

- ✅ **Modular Design**: Each endpoint has dedicated models, repository, and service
- ✅ **Type Safety**: Full type hints with Pydantic models
- ✅ **Dependency Injection**: Clean service injection
- ✅ **API Documentation**: Auto-generated with FastAPI
- ✅ **CORS Support**: Configured for cross-origin requests
- ✅ **Environment Configuration**: Support for `.env` files
- ✅ **Integrated Logging**: Object-oriented logging configuration in Settings class
- ✅ **Profile Image Support**: Dynamic profile images with fallback to initials
- ✅ **Welcome Text System**: Page-specific welcome texts from backend
- ✅ **CSV Data Source**: Structured data from CSV files
- ✅ **Error Handling**: Graceful fallbacks for missing data

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

1. Follow the existing architecture patterns
2. Maintain separation of concerns
3. Add proper type hints
4. Include docstrings for all functions
5. Add appropriate logging
6. Test your changes

## 📄 License

This project is part of the portfolio application. 