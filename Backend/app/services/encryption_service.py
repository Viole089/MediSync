import base64
from app.services.crypto_utils import derive_kek, encrypt_aes_gcm, decrypt_aes_gcm
import os

def prepare_envelope_encryption(cin: str) -> dict:
    salt = os.urandom(16)
    dek = os.urandom(32)

    kek = derive_kek(cin, salt)
    dek_nonce, encrypted_dek = encrypt_aes_gcm(kek, dek.hex())

    return {
        "encrypted_dek": base64.b64encode(encrypted_dek).decode(),
        "dek_nonce": base64.b64encode(dek_nonce).decode(),
        "salt": base64.b64encode(salt).decode()
    }

def decrypt_patient_data(dek: bytes, nonce_b64: str, ciphertext_b64: str) -> str:
    nonce = base64.b64decode(nonce_b64)
    ciphertext = base64.b64decode(ciphertext_b64)
    plaintext = decrypt_aes_gcm(dek, nonce, ciphertext)
    return plaintext.decode()

def encrypt_patient_data(dek: bytes, plaintext: str) -> dict:
    nonce, ciphertext = encrypt_aes_gcm(dek, plaintext)
    return {
        "encrypted_medical_data": base64.b64encode(ciphertext).decode(),
        "medical_data_nonce": base64.b64encode(nonce).decode()
    }
