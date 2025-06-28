# CSV Data Structure Documentation

This folder contains CSV files converted from the original JSON data files, organized into logical categories for better data management and accessibility.

## Folder Structure

### 📁 Personal Data (`/personal/`)
Contains all personal information and background data.
- `personal_profiles.csv` - Main personal information
- `education.csv` - Educational background
- `family_members.csv` - Family member relationships
- `hobbies.csv` - Personal hobbies and interests
- `social_profiles.csv` - Social media and professional profiles

### 📁 Work Experience (`/work_experience/`)
Contains employment and career-related data.
- `work_experience.csv` - Work experience records (includes `username` column)
- `work_experience_projects.csv` - Work experience to project relationships

### 📁 Projects (`/projects/`)
Contains all project-related data including ML models.
- `projects.csv` - Project information (includes `username` column)
- `project_skills.csv` - Project to skill relationships
- `project_achievements.csv` - Project achievements
- `project_ml_models.csv` - **NEW**: Many-to-many relationship between projects and ML models
- `ml_models.csv` - Machine learning models
- `ml_model_evaluation_metrics.csv` - **NEW**: Evaluation metrics for ML models (replaces single accuracy column)
- `ml_model_training_parameters.csv` - ML model training parameters
- `ml_model_use_cases.csv` - ML model use cases

### 📁 Skills (`/skills/`)
Contains skills and competencies data used across categories.
- `skill_categories.csv` - Skill category definitions
- `skills.csv` - Individual skills with ratings

### 📁 Certifications (`/certifications/`)
Contains professional certification data.
- `certifications.csv` - Professional certifications (includes `username` column)
- `certification_skills.csv` - Certification to skill relationships

## Data Relationships

### Personal Data
- `personal_profiles` → `family_members` (1:many)
- `personal_profiles` → `hobbies` (1:many)
- `personal_profiles` → `social_profiles` (1:many)

### Skills & Certifications
- `skill_categories` → `skills` (1:many)
- `certifications` → `certification_skills` (1:many)
- `certification_skills` → `skills` (many:1)

### Projects & Work Experience
- `work_experience` → `work_experience_projects` (1:many)
- `work_experience_projects` → `projects` (many:1)
- `projects` → `project_skills` (1:many)
- `project_skills` → `skills` (many:1)
- `projects` → `project_achievements` (1:many)
- `projects` ↔ `ml_models` (many:many via `project_ml_models`)

### ML Models & Evaluation
- `ml_models` → `ml_model_evaluation_metrics` (1:many) - **NEW RELATIONSHIP**
- `ml_models` → `ml_model_training_parameters` (1:many)
- `ml_models` → `ml_model_use_cases` (1:many)

## Recent Updates

### ✅ ML Model Evaluation Metrics Structure
**Problem**: Single `accuracy` column in `ml_models.csv` was insufficient for comprehensive model evaluation.

**Solution**: 
- Created `ml_model_evaluation_metrics.csv` with structure:
  ```
  _id, ml_model_id, metric_name, metric_value, metric_type, description
  ```
- Supports multiple metrics per model (accuracy, precision, recall, F1-score, RMSE, MAE, R-squared, etc.)
- Added comprehensive evaluation metrics for all 11 ML models
- Removed `accuracy` column from `ml_models.csv`

### ✅ Many-to-Many Project-ML Model Relationship
**Problem**: Single `ml_models` column in `projects.csv` limited projects to one model each.

**Solution**:
- Created `project_ml_models.csv` junction table:
  ```
  _id, project_id, ml_model_id, model_role, model_version
  ```
- Removed `ml_models` column from `projects.csv`
- Supports multiple models per project with role specification
- Enables future expansion for multi-model projects

### ✅ Enhanced Project Structure
**Problem**: Single `deployment` field was insufficient for categorizing projects and tracking their status.

**Solution**: 
- Replaced `deployment` field with structured `project_type` field with predefined values:
  - POC, MVP, Data Analysis, Research, Model Building, Algorithm Development, Consultation, Project
- Added new `status` field to track project progress:
  - Completed, On Hold, In Progress, Not Started, Cancelled
- **UPDATED**: Removed redundant `duration` field - now computed dynamically from `start_date` and `end_date`
- Updated all project-related models and endpoints to support the new structure

## Key Features

1. **Organized Structure**: Data is categorized by logical domains
2. **Normalized Design**: Proper normalization to avoid redundancy
3. **Referential Integrity**: Foreign keys maintain data relationships
4. **Scalable Architecture**: Easy to add new records and categories
5. **Query Optimized**: Designed for efficient database operations
6. **Maintainable**: Clear separation of concerns with documentation
7. **Flexible ML Evaluation**: Support for multiple evaluation metrics per model
8. **Multi-Model Projects**: Support for projects using multiple ML models

## Usage Notes

- Text fields may contain commas, so proper CSV parsing is required
- Some fields may be empty (null values) for optional data
- Dates are in ISO format (YYYY-MM-DD)
- Ratings are on a scale of 1-5 where applicable
- Evaluation metrics support both classification and regression metrics
- Project types are predefined: POC, MVP, Data Analysis, Research, Model Building, Algorithm Development, Consultation, Project
- Project status values: Completed, On Hold, In Progress, Not Started, Cancelled
- Project duration is computed automatically from start_date and end_date (ongoing projects use current date)
- Each category folder contains its own README with detailed information

## Category-Specific Documentation

Each category folder contains a detailed README file explaining:
- Files included in that category
- Data relationships specific to that category
- Key information and usage patterns
- Related data from other categories 