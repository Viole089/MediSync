from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.services.mongo_service import users_collection
from app.services.encryption_service import encrypt_patient_data, decrypt_patient_data
from app.services.crypto_utils import derive_kek, decrypt_aes_gcm
import base64
from datetime import datetime

router = APIRouter()

@router.patch("update_patient_history/{cin}")
async def update_patient_history(cin: str, new_record: dict, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can update patient data.")

    patient = users_collection.find_one({"cin": cin})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    salt = base64.b64decode(patient["salt"])
    encrypted_dek = base64.b64decode(patient["encrypted_dek"])
    dek_nonce = base64.b64decode(patient["dek_nonce"])

    kek = derive_kek(cin, salt)
    dek = decrypt_aes_gcm(kek, dek_nonce, encrypted_dek)
    dek_bytes = bytes.fromhex(dek.decode())

    encrypted_data = encrypt_patient_data(dek_bytes, str(new_record))

    update_query = {
        "$push": {
            "medical_history": encrypted_data
        }
    }
    users_collection.update_one({"cin": cin}, update_query)
    audit_entry = {
        "doctor_email": current_user["sub"],
        "patient_cin": cin,
        "action": "Updated patient's medical history",
        "timestamp": datetime.utcnow().isoformat()
    }
    audit_logs_collection.insert_one(audit_entry)
    return {"message": "Medical history updated and encrypted successfully"}

@router.get("/doctor/get_patient_history/{cin}")
async def get_patient_history(cin: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Only doctors can access this data.")

    patient = users_collection.find_one({"cin": cin})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    salt = base64.b64decode(patient["salt"])
    encrypted_dek = base64.b64decode(patient["encrypted_dek"])
    dek_nonce = base64.b64decode(patient["dek_nonce"])

    kek = derive_kek(cin, salt)
    dek = decrypt_aes_gcm(kek, dek_nonce, encrypted_dek)

    decrypted_records = []
    for entry in patient["medical_history"]:
        dek_bytes = bytes.fromhex(dek.decode())

        decrypted_entry = decrypt_patient_data(dek_bytes, entry["medical_data_nonce"], entry["encrypted_medical_data"])
        decrypted_records.append(decrypted_entry)
    audit_entry = {
        "doctor_email": current_user["sub"],
        "patient_cin": cin,
        "action": "Retrieved patient's medical summary",
        "timestamp": datetime.utcnow().isoformat()
    }
    audit_logs_collection.insert_one(audit_entry)
    return {"medical_history": decrypted_records}
