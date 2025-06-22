# Skills Data Category

This folder contains all skills and competencies data that are used across multiple categories.

## Files Included:

### Core Skills Data
- **`skill_categories.csv`** - Skill category definitions and descriptions
- **`skills.csv`** - Individual skills with ratings and category references

## Data Relationships:
- `skill_categories` → `skills` (1:many)
- `skills` → `project_skills` (1:many) [in projects folder]
- `skills` → `certification_skills` (1:many) [in certifications folder]

## Key Information:
- Skill categories (NLP, Computer Vision, MLOps, etc.)
- Individual skills with proficiency ratings (1-5 scale)
- Skill descriptions and classifications
- Cross-references to projects and certifications

## Skill Categories:
1. **Natural Language Processing** - NLP tools and techniques
2. **Computer Vision** - Image and video processing skills
3. **Agentic & Generative AI** - AI agents and generative models
4. **Cloud & MLOps** - Cloud platforms and ML operations
5. **Machine Learning Engineering** - Core ML engineering skills
6. **Web Development** - Frontend and backend technologies
7. **Data Processing & Analytics** - Data manipulation and visualization
8. **Hardware & IoT** - Hardware platforms and IoT skills
9. **Development Tools** - Development environments and tools

## Usage:
This data is typically used for:
- Skills assessment and rating
- Project skill requirements
- Certification validation
- Resume/CV skill sections
- Portfolio skill displays
- Competency mapping

## Related Data:
- Projects data (in projects folder) - for skills used in projects
- Certifications data (in certifications folder) - for skills validated by certifications 