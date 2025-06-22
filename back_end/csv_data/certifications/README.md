# Certifications Data Category

This folder contains all professional certification and credential data.

## Files Included:

### Core Certification Data
- **`certifications.csv`** - Main certification information with details and validity. **Includes `username` column** (second column) identifying certificate holder
- **`certification_skills.csv`** - Skills validated by each certification

## Data Relationships:
- `certifications` → `certification_skills` (1:many)
- `certification_skills` → `skills` (many:1) [in skills folder]

## Key Information:
- Certification names and issuing organizations
- Issue and expiry dates
- Credential IDs and verification URLs
- Skills validated by each certification
- Certification descriptions and requirements

## Certification Types:
- **Cloud Platforms** - AWS, Google Cloud, Azure certifications
- **Machine Learning** - TensorFlow, ML engineering certifications
- **AI & NLP** - Hugging Face, OpenAI, BERT certifications
- **Computer Vision** - OpenCV, computer vision certifications
- **Development** - Docker, FastAPI, web development certifications

## Usage:
This data is typically used for:
- Professional credential verification
- Skills validation and proof
- Resume/CV certification sections
- Competency assessment
- Professional development tracking
- Credential management

## Related Data:
- Skills data (in skills folder) - for skills validated by certifications
- Projects data (in projects folder) - for skills demonstrated in projects
- Work experience data (in work_experience folder) - for professional context 