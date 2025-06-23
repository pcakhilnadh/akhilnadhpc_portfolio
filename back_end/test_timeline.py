#!/usr/bin/env python3
"""
Test script for timeline backend changes
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from repositories.timeline_repository import TimelineRepository

def test_timeline_data():
    """Test the timeline data retrieval."""
    try:
        # Create repository instance
        repository = TimelineRepository()
        
        # Get timeline data for the user
        timeline_data = repository.get_timeline_data("akhilnadhpc")
        
        print("=== Timeline Data Test ===")
        print(f"Welcome Text: {timeline_data.welcome_text}")
        print(f"Number of Experiences: {len(timeline_data.experiences)}")
        print(f"Number of Education Entries: {len(timeline_data.education)}")
        
        print("\n=== Work Experiences ===")
        for exp in timeline_data.experiences:
            print(f"ID: {exp.id}")
            print(f"Title: {exp.title}")
            print(f"Company: {exp.company}")
            print(f"Company URL: {exp.company_url}")
            print(f"Start Date: {exp.start_date}")
            print(f"End Date: {exp.end_date}")
            print(f"Description: {exp.description}")
            print("---")
        
        print("\n=== Education ===")
        for edu in timeline_data.education:
            print(f"ID: {edu.id}")
            print(f"Degree: {edu.degree}")
            print(f"Institution: {edu.institution}")
            print(f"Institution URL: {edu.institution_url}")
            print(f"Field of Study: {edu.field_of_study}")
            print(f"Start Date: {edu.start_date}")
            print(f"End Date: {edu.end_date}")
            print(f"GPA: {edu.gpa}")
            print("---")
        
        print("✅ Timeline backend test completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during test: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_timeline_data() 