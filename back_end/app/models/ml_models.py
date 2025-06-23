from pydantic import BaseModel, Field
from typing import List, Optional


class MLModelBase(BaseModel):
    """Base model for ML model information - baseline data."""
    id: str = Field(description="ML Model ID (e.g., model_001)")
    name: str = Field(description="ML Model name")
    model_type: str = Field(description="Type of ML model")


class MLModelUseCase(BaseModel):
    """Model for ML model use cases."""
    id: str = Field(description="Use case ID")
    use_case_name: str = Field(description="Name of the use case")
    use_case_description: str = Field(description="Description of the use case")
    business_impact: str = Field(description="Business impact of the use case")


class MLModelTrainingParameter(BaseModel):
    """Model for ML model training parameters."""
    id: str = Field(description="Training parameter ID")
    parameter_name: str = Field(description="Name of the parameter")
    parameter_value: str = Field(description="Value of the parameter")
    parameter_type: str = Field(description="Type of parameter (e.g., hyperparameter)")


class MLModel(MLModelBase):
    """Extended ML model with full details including use cases and training parameters."""
    # Inherited fields: id, name, model_type
    framework: str = Field(description="ML framework used")
    version: str = Field(description="Model version")
    accuracy: float = Field(description="Model accuracy", ge=0.0, le=1.0)
    training_data_size: str = Field(description="Size of training data")
    deployment_status: str = Field(description="Deployment status")
    use_cases: Optional[List[MLModelUseCase]] = Field(default=None, description="ML model use cases")
    training_parameters: Optional[List[MLModelTrainingParameter]] = Field(default=None, description="Training parameters") 