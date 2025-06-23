from typing import List, Optional
from ..models.ml_models import MLModel, MLModelBase, MLModelUseCase, MLModelTrainingParameter
from ..data_access.interfaces import IPersonalDataAccess
from ..data_access.csv_data_access import CSVDataAccess


class MLModelsRepository:
    """Repository for ML models data."""
    
    def __init__(self, data_access: IPersonalDataAccess = None):
        self.data_access = data_access or CSVDataAccess()
    
    def get_ml_model_by_id(self, model_id: str) -> Optional[MLModel]:
        """Get ML model information by ID with use cases and training parameters."""
        try:
            import csv
            import os
            
            # Path to ML models CSV file
            ml_models_path = os.path.join(self.data_access.csv_data_path, "projects", "ml_models.csv")
            
            with open(ml_models_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['_id'] == model_id:
                        # Get use cases for this model
                        use_cases = self._get_model_use_cases(model_id)
                        
                        # Get training parameters for this model
                        training_parameters = self._get_model_training_parameters(model_id)
                        
                        return MLModel(
                            id=row['_id'],
                            name=row['name'],
                            model_type=row['model_type'],
                            framework=row['framework'],
                            version=row['version'],
                            accuracy=float(row['accuracy']),
                            training_data_size=row['training_data_size'],
                            deployment_status=row['deployment_status'],
                            use_cases=use_cases if use_cases else None,
                            training_parameters=training_parameters if training_parameters else None
                        )
            
            return None
            
        except Exception as e:
            self.data_access.logger.error(f"Error getting ML model by ID {model_id}: {e}")
            return None
    
    def _get_model_use_cases(self, model_id: str) -> List[MLModelUseCase]:
        """Get use cases for a specific ML model."""
        try:
            import csv
            import os
            
            # Path to ML model use cases CSV file
            use_cases_path = os.path.join(self.data_access.csv_data_path, "projects", "ml_model_use_cases.csv")
            
            use_cases = []
            with open(use_cases_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['ml_model_id'] == model_id:
                        use_cases.append(
                            MLModelUseCase(
                                id=row['_id'],
                                use_case_name=row['use_case_name'],
                                business_impact=row['business_impact']
                            )
                        )
            
            return use_cases
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading ML model use cases for {model_id}: {e}")
            return []
    
    def _get_model_training_parameters(self, model_id: str) -> List[MLModelTrainingParameter]:
        """Get training parameters for a specific ML model."""
        try:
            import csv
            import os
            
            # Path to ML model training parameters CSV file
            params_path = os.path.join(self.data_access.csv_data_path, "projects", "ml_model_training_parameters.csv")
            
            parameters = []
            with open(params_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['ml_model_id'] == model_id:
                        parameters.append(
                            MLModelTrainingParameter(
                                id=row['_id'],
                                parameter_name=row['parameter_name'],
                                parameter_value=row['parameter_value'],
                                parameter_type=row['parameter_type']
                            )
                        )
            
            return parameters
            
        except Exception as e:
            self.data_access.logger.error(f"Error reading ML model training parameters for {model_id}: {e}")
            return [] 