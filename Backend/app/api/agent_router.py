from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.services.mongo_service import users_collection, audit_logs_collection
from app.services.encryption_service import decrypt_patient_data
from app.services.crypto_utils import derive_kek, decrypt_aes_gcm
from agent.ClinicalAssistant import ClinicalAssistantAgent
from datetime import datetime
import base64

router = APIRouter()

agent = ClinicalAssistantAgent()

def get_decrypted_medical_history(cin: str):
    patient = users_collection.find_one({"cin": cin})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found.")

    salt = base64.b64decode(patient["salt"])
    encrypted_dek = base64.b64decode(patient["encrypted_dek"])
    dek_nonce = base64.b64decode(patient["dek_nonce"])

    kek = derive_kek(cin, salt)
    dek = decrypt_aes_gcm(kek, dek_nonce, encrypted_dek)
    dek_bytes = bytes.fromhex(dek.decode())

    decrypted_records = []
    for entry in patient["medical_history"]:
        decrypted_entry = decrypt_patient_data(dek_bytes, entry["medical_data_nonce"], entry["encrypted_medical_data"])
        decrypted_records.append(decrypted_entry)
    return decrypted_records

@router.get("/describe_patient/{cin}")
async def describe_patient_history(cin: str, current_user: dict = Depends(get_current_user)):
    """
    Summarize the patient's medical history in French.
    Accessible by Doctors only.
    """
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can access this endpoint.")

    decrypted_history = get_decrypted_medical_history(cin)

    result = agent.describe_medical_history({"medical_history": decrypted_history})

    audit_logs_collection.insert_one({
        "doctor_email": current_user["sub"],
        "patient_cin": cin,
        "action": "Agent summarized patient medical history",
        "timestamp": datetime.utcnow().isoformat()
    })

    return {"summary": result}

@router.get("/recommend_patient/{cin}")
async def recommend_patient_instructions(cin: str, current_user: dict = Depends(get_current_user)):
    """
    Provide clinical advice and emotional support based on patient's history.
    Accessible by Doctors only.
    """
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can access this endpoint.")

    decrypted_history = get_decrypted_medical_history(cin)

    result = agent.recommend_instructions({"medical_history": decrypted_history})

    audit_logs_collection.insert_one({
        "doctor_email": current_user["sub"],
        "patient_cin": cin,
        "action": "Agent provided recommendations for patient",
        "timestamp": datetime.utcnow().isoformat()
    })

    return {"recommendations": result}

@router.get("/emotional_checkin")
async def emotional_checkin(current_user: dict = Depends(get_current_user)):
    """
    Provide a short emotional wellness check-in message.
    Accessible by all authenticated users.
    """
    result = agent.emotional_check_in()
    return {"message": result}

@router.get("/break_reminder")
async def break_reminder(current_user: dict = Depends(get_current_user)):
    """
    Send a supportive break reminder.
    Accessible by all authenticated users.
    """
    result = agent.break_reminder()
    return {"reminder": result}
