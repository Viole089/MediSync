from pydantic import BaseModel
from typing import Optional, Dict

class Doctor(BaseModel):
    email: str
    password: str 
    cin: str
    name: Optional[str] = None
    is_active: bool = False
    pending_validation: bool = True
    medical_history: Optional[Dict[str, str]] = {}  