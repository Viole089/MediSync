from pydantic import BaseModel
from typing import Dict, Optional

class PatientCreate(BaseModel):
    name: str
    cin: str
    age: Optional[int] = None
    medical_history: Optional[Dict[str, str]] = {}

class MedicalHistoryUpdate(BaseModel):
    updates: Dict[str, str]

class PatientSummary(BaseModel):
    name: str
    cin: str
    age: Optional[int] = None
    medical_history: Optional[Dict[str, str]] = {}
    