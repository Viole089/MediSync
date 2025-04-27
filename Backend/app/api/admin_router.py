from fastapi import APIRouter, Depends, HTTPException
from app.models.user_model import UserLogin
from app.core.security import get_password_hash, get_current_user
from app.services.mongo_service import users_collection

router = APIRouter()

@router.post("/register_admin")
async def register_admin(user: UserLogin):
    existing_admin = users_collection.find_one({"email": user.email})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists with this email")

    hashed_pw = get_password_hash(user.password)
    new_admin = {
        "email": user.email,
        "hashed_password": hashed_pw,
        "role": "admin",
        "is_active": True
    }
    users_collection.insert_one(new_admin)
    return {"message": "Admin registered successfully"}

@router.patch("/validate_doctor/{email}")
async def validate_doctor(email: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admins can validate doctors.")

    doctor = users_collection.find_one({"email": email, "pending_validation": True})
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found or already validated")

    users_collection.update_one(
        {"email": email},
        {"$set": {"is_active": True, "pending_validation": False}}
    )
    return {"message": f"Doctor {email} validated successfully"}
