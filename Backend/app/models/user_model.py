from pydantic import BaseModel
from typing import Optional

class UserCreatePatient(BaseModel):
    email: str
    password: str
    cin: str

class UserCreateDoctor(BaseModel):
    email: str
    password: str
    cin: str
    specialty: Optional[str] = None
    hospital: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str
