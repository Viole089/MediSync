from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user_model import UserLogin, UserCreatePatient, UserCreateDoctor
from app.core.security import get_password_hash, verify_password, create_access_token
from app.services.mongo_service import users_collection, patients_collection, doctors_collection
from pymongo.errors import DuplicateKeyError

router = APIRouter()

@router.post("/register_patient")
async def register_patient(user: UserCreatePatient):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Patient already exists")

    hashed_pw = get_password_hash(user.password)

    new_user = {
        "email": user.email,
        "hashed_password": hashed_pw,
        "role": "patient",
        "cin": user.cin,
        "is_active": True
    }
    users_collection.insert_one(new_user)

    new_patient = {
        "email": user.email,
        "cin": user.cin,
        "medical_history": {}  
    }
        
    try:
        patients_collection.insert_one(new_patient)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="CIN already exists for another patient")


    return {"message": "Patient registered successfully"}

@router.post("/register_doctor")
async def register_doctor(user: UserCreateDoctor):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Doctor already exists")

    hashed_pw = get_password_hash(user.password)

    new_user = {
        "email": user.email,
        "hashed_password": hashed_pw,
        "role": "doctor",
        "cin": user.cin,
        "is_active": False,  
        "pending_validation": True
    }
    users_collection.insert_one(new_user)

    new_doctor = {
        "email": user.email,
        "cin": user.cin,
        "specialties": [],    
        "validated": False    
    }
    doctors_collection.insert_one(new_doctor)

    return {"message": "Doctor registration pending admin validation"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    existing_user = users_collection.find_one({"email": form_data.username})

    if not existing_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password.")

    if not verify_password(form_data.password, existing_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password.")

    if not existing_user.get("is_active", False):
        raise HTTPException(status_code=403, detail="Account pending validation by admin.")

    access_token = create_access_token(
        data={"sub": existing_user["email"], "role": existing_user["role"]}
    )

    return {"access_token": access_token, "token_type": "bearer"}
