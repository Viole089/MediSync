from app.services.mongo_service import audit_logs_collection
from datetime import datetime
import socket

def log_action(user_email: str, user_role: str, action: str, target_cin: str = None, details: str = ""):
    audit_logs_collection.insert_one({
        "timestamp": datetime.utcnow().isoformat(),
        "user_email": user_email,
        "user_role": user_role,
        "action": action,
        "target_cin": target_cin,
        "details": details,
        "ip_address": socket.gethostbyname(socket.gethostname())
    })
