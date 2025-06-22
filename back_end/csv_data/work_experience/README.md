# Work Experience Data Category

This folder contains all work experience and employment-related data.

## Files Included:

### Core Work Experience
- **`work_experience.csv`** - Main work experience records with company details, positions, and dates. **Includes `username` column** (second column) identifying the owner of each record
- **`work_experience_projects.csv`** - Relationship between work experiences and associated projects

## Data Relationships:
- `work_experience` → `work_experience_projects` (1:many)
- `work_experience_projects` → `projects` (many:1) [in projects folder]

## Key Information:
- Company names and locations
- Job titles and designations
- Employment dates and duration
- Project associations during employment
- Career progression timeline

## Usage:
This data is typically used for:
- Resume/CV generation
- Work history displays
- Career timeline visualization
- Project portfolio organization
- Professional experience tracking

## Related Data:
- Projects data (in projects folder) - for detailed project information
- Skills data (in root csv_data folder) - for skills used in each role 