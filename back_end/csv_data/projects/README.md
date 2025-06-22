# Projects Data Category

This folder contains all project-related data including project details, achievements, and associated ML models.

## Files Included:

### Core Project Data
- **`projects.csv`** - Main project information with descriptions, tech stack, and metadata. **Includes `username` column** (second column) identifying project ownership
- **`project_skills.csv`** - Skills used in each project
- **`project_achievements.csv`** - Achievements and outcomes for each project

### ML Models Data
- **`ml_models.csv`** - Machine learning models used in projects
- **`ml_model_training_parameters.csv`** - Training parameters for each model
- **`ml_model_use_cases.csv`** - Use cases and applications for each model

## Data Relationships:
- `projects` → `project_skills` (1:many)
- `project_skills` → `skills` (many:1) [in skills folder]
- `projects` → `project_achievements` (1:many)
- `projects` → `ml_models` (many:1)
- `ml_models` → `ml_model_training_parameters` (1:many)
- `ml_models` → `ml_model_use_cases` (1:many)

## Key Information:
- Project titles, descriptions, and types (professional/personal)
- Technology stack and tools used
- Project duration and role information
- Achievements and measurable outcomes
- ML models and their configurations
- Deployment and hosting information

## Project Types:
- **Professional Projects** - Work-related projects with companies
- **Personal Projects** - Individual projects and research

## Usage:
This data is typically used for:
- Portfolio displays
- Project showcases
- Technical skill demonstrations
- Achievement tracking
- ML model documentation
- Technology stack analysis

## Related Data:
- Skills data (in skills folder) - for skills used in projects
- Work experience data (in work_experience folder) - for project associations
- Certifications data (in certifications folder) - for skills validated by projects 